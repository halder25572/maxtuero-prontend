/*
  Property Step 2 upload helper (single-endpoint contract)

  Backend behavior this matches:
  - POST step2 without chunk_data => init upload session (+ optional images)
  - POST step2 with chunk_data   => upload a chunk

  Final video URL is created by backend under /public/uploads/videos and returned as `video_url`.
*/

export type UploadStatus = "pending" | "completed";

export interface Step2InitResponseData {
  property_id: number;
  upload_id: string;
  total_chunks: number;
  status: UploadStatus;
}

export interface Step2ChunkResponseData {
  upload_id: string;
  chunk_number?: number;
  received_chunks?: number;
  total_chunks?: number;
  status: UploadStatus;
  video_url?: string;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors?: Record<string, string[] | string>;
  exception?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface Step2ClientOptions {
  baseUrl: string;
  token: string;
  endpointBuilder?: (propertyId: number | string) => string;
}

export interface InitStep2Input {
  propertyId: number | string;
  images: File[];
  videoFileName: string;
  totalChunks: number;
  fileSize: number;
}

export interface UploadChunkInput {
  propertyId: number | string;
  uploadId: string;
  chunkNumber: number;
  chunkBlob: Blob;
  chunkFileName?: string;
}

export interface UploadVideoWithChunksInput {
  propertyId: number | string;
  images: File[];
  videoFile: File;
  chunkSizeBytes?: number;
  onProgress?: (progress: {
    uploadId: string;
    chunkNumber: number;
    totalChunks: number;
    percent: number;
  }) => void;
}

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function defaultEndpointBuilder(propertyId: number | string): string {
  // Endpoint path (baseUrl should include /api prefix if needed)
  return `/property/${propertyId}/step2`;
}

function getStep2Endpoint(options: Step2ClientOptions, propertyId: number | string): string {
  const endpoint = (options.endpointBuilder ?? defaultEndpointBuilder)(propertyId);
  return `${normalizeBaseUrl(options.baseUrl)}${endpoint}`;
}

async function postFormData<T>(url: string, token: string, formData: FormData): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = (await response.json()) as ApiResponse<T>;

  if (!response.ok && json && typeof json === "object") {
    return json;
  }

  return json;
}

export async function initPropertyStep2Upload(
  options: Step2ClientOptions,
  input: InitStep2Input,
): Promise<ApiResponse<Step2InitResponseData>> {
  const url = getStep2Endpoint(options, input.propertyId);

  const formData = new FormData();
  for (const image of input.images) {
    formData.append("images[]", image);
  }

  formData.append("video_name", input.videoFileName);
  formData.append("total_chunks", String(input.totalChunks));
  formData.append("file_size", String(input.fileSize));

  return postFormData<Step2InitResponseData>(url, options.token, formData);
}

export async function uploadPropertyStep2Chunk(
  options: Step2ClientOptions,
  input: UploadChunkInput,
): Promise<ApiResponse<Step2ChunkResponseData>> {
  const url = getStep2Endpoint(options, input.propertyId);

  const formData = new FormData();
  formData.append("upload_id", input.uploadId);
  formData.append("chunk_number", String(input.chunkNumber));
  formData.append("chunk_data", input.chunkBlob, input.chunkFileName ?? `chunk_${input.chunkNumber}.part`);

  return postFormData<Step2ChunkResponseData>(url, options.token, formData);
}

export function splitFileIntoChunks(file: File, chunkSizeBytes = DEFAULT_CHUNK_SIZE): Blob[] {
  const chunks: Blob[] = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + chunkSizeBytes, file.size);
    chunks.push(file.slice(start, end));
    start = end;
  }

  return chunks;
}

export async function uploadPropertyStep2VideoWithChunks(
  options: Step2ClientOptions,
  input: UploadVideoWithChunksInput,
): Promise<ApiResponse<Step2ChunkResponseData>> {
  const chunkSize = input.chunkSizeBytes ?? DEFAULT_CHUNK_SIZE;
  const chunks = splitFileIntoChunks(input.videoFile, chunkSize);

  const initResponse = await initPropertyStep2Upload(options, {
    propertyId: input.propertyId,
    images: input.images,
    videoFileName: input.videoFile.name,
    totalChunks: chunks.length,
    fileSize: input.videoFile.size,
  });

  if (!initResponse.success) {
    return initResponse;
  }

  const uploadId = initResponse.data.upload_id;
  const totalChunks = initResponse.data.total_chunks;

  let lastChunkResponse: ApiResponse<Step2ChunkResponseData> = {
    success: true,
    data: {
      upload_id: uploadId,
      status: "pending",
      total_chunks: totalChunks,
      received_chunks: 0,
    },
  };

  for (let i = 0; i < chunks.length; i += 1) {
    const chunkNumber = i + 1;

    lastChunkResponse = await uploadPropertyStep2Chunk(options, {
      propertyId: input.propertyId,
      uploadId,
      chunkNumber,
      chunkBlob: chunks[i],
      chunkFileName: `${input.videoFile.name}.part${chunkNumber}`,
    });

    if (!lastChunkResponse.success) {
      return lastChunkResponse;
    }

    if (input.onProgress) {
      input.onProgress({
        uploadId,
        chunkNumber,
        totalChunks,
        percent: Math.round((chunkNumber / totalChunks) * 100),
      });
    }
  }

  return lastChunkResponse;
}
