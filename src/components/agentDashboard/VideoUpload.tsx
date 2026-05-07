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
  chunkFile: Blob;
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

const DEFAULT_CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB chunks

type FileChunk = {
  blob: Blob;
  fileName: string;
};

function splitFileIntoChunkFiles(
  file: File,
  chunkSizeBytes = DEFAULT_CHUNK_SIZE,
  fileNameBuilder: (chunkNumber: number) => string = (chunkNumber) =>
    buildChunkFileName(file.name, chunkNumber),
): File[] {
  const chunks: File[] = [];
  let start = 0;
  let chunkNumber = 1;

  while (start < file.size) {
    const end = Math.min(start + chunkSizeBytes, file.size);
    const chunk = new File(
      [file.slice(start, end, file.type || "video/mp4")],
      fileNameBuilder(chunkNumber),
      { type: file.type || "video/mp4" },
    );
    chunks.push(chunk);
    start = end;
    chunkNumber += 1;
  }

  return chunks;
}

function buildChunkFileName(originalFileName: string, chunkNumber: number): string {
  const extensionIndex = originalFileName.lastIndexOf(".");

  if (extensionIndex === -1) {
    return `chunk_${chunkNumber}.mp4`;
  }

  const baseName = originalFileName.slice(0, extensionIndex);
  const extension = originalFileName.slice(extensionIndex);
  return `${baseName}.part${chunkNumber}${extension}`;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function defaultEndpointBuilder(propertyId: number | string): string {
  // Adjust once if your backend route differs.
  return `/api/property/${propertyId}/step2`;
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

  // Check for 401/403 responses (deleted user, invalid token, etc.)
  if (response.status === 401 || response.status === 403) {
    console.warn(`Authentication failed (${response.status}): User may be deleted or token invalid`);
    // Don't clear storage or redirect - let the user stay on the page
    // Return a failure response so the UI can handle it appropriately
    return {
      success: false,
      message: "Authentication failed - user may be deleted or session expired"
    };
  }

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
  formData.append(
    "chunk_data",
    input.chunkFile,
    input.chunkFileName ?? "chunk.mp4",
  );

  return postFormData<Step2ChunkResponseData>(url, options.token, formData);
}

export function splitFileIntoChunks(file: File, chunkSizeBytes = DEFAULT_CHUNK_SIZE): FileChunk[] {
  const chunks: FileChunk[] = [];
  let start = 0;
  let chunkNumber = 1;

  while (start < file.size) {
    const end = Math.min(start + chunkSizeBytes, file.size);
    const chunk = {
      blob: file.slice(start, end, file.type || "video/mp4"),
      fileName: buildChunkFileName(file.name, chunkNumber),
    };
    chunks.push(chunk);
    start = end;
    chunkNumber += 1;
  }

  return chunks;
}

export async function uploadPropertyStep2VideoWithChunks(
  options: Step2ClientOptions,
  input: UploadVideoWithChunksInput,
): Promise<ApiResponse<Step2ChunkResponseData>> {
  const chunkSize = input.chunkSizeBytes ?? DEFAULT_CHUNK_SIZE;
  const chunks = splitFileIntoChunks(input.videoFile, chunkSize);

  // Treat images as optional - send empty array if none selected
  const imagesToSend = input.images && input.images.length > 0 ? input.images : [];

  const initResponse = await initPropertyStep2Upload(options, {
    propertyId: input.propertyId,
    images: imagesToSend,
    videoFileName: input.videoFile.name,
    totalChunks: chunks.length,
    fileSize: input.videoFile.size,
  });

  // Handle 422 error by retrying without images
  if (!initResponse.success && initResponse.message && initResponse.message.includes('422')) {
    console.log('Retrying init without images due to 422 error');
    const retryResponse = await initPropertyStep2Upload(options, {
      propertyId: input.propertyId,
      images: [], // Send empty array
      videoFileName: input.videoFile.name,
      totalChunks: chunks.length,
      fileSize: input.videoFile.size,
    });
    
    if (!retryResponse.success) {
      return retryResponse;
    }
  } else if (!initResponse.success) {
    return initResponse;
  }

  const uploadId = initResponse.success && initResponse.data ? initResponse.data.upload_id : '';
  const totalChunks = initResponse.success && initResponse.data ? initResponse.data.total_chunks : chunks.length;

  let lastChunkResponse: ApiResponse<Step2ChunkResponseData> = {
    success: true,
    data: {
      upload_id: uploadId,
      status: "pending",
      total_chunks: totalChunks,
      received_chunks: 0,
    },
  };

  // Reduced concurrency to prevent server timeouts
  const concurrentUploads = 2;
  const uploadPromises: Promise<ApiResponse<Step2ChunkResponseData>>[] = [];
  let completedChunks = 0;
  let lastReportedProgress = 0;
  let uploadCompleted = false;

  // Function to report progress with 5% increments
  const reportProgress = (currentProgress: number) => {
    // Round to nearest 5% increment
    const roundedProgress = Math.round(currentProgress / 5) * 5;
    
    // Only report if progress has changed by at least 5%
    if (roundedProgress > lastReportedProgress && roundedProgress <= 100) {
      lastReportedProgress = roundedProgress;
      
      if (input.onProgress) {
        input.onProgress({
          uploadId,
          chunkNumber: completedChunks,
          totalChunks,
          percent: roundedProgress,
        });
      }
    }
  };

  for (let i = 0; i < chunks.length; i++) {
    const chunkNumber = i + 1;
    
    const uploadPromise = uploadPropertyStep2Chunk(options, {
      propertyId: input.propertyId,
      uploadId,
      chunkNumber,
      chunkFile: chunks[i].blob,
      chunkFileName: chunks[i].fileName,
    }).then(response => {
      completedChunks++;
      
      // Check if upload is completed and stop further uploads
      if (response.success && response.data?.status === 'completed') {
        uploadCompleted = true;
        console.log('Upload completed early, status: completed');
        // Surface video_url to UI if available
        if (response.data?.video_url) {
          console.log('Video URL available:', response.data.video_url);
        }
      }
      
      // Keep the last successful chunk response
      if (response.success) {
        lastChunkResponse = response;
      }
      
      // Calculate current progress and report in 5% increments
      const currentProgress = (completedChunks / totalChunks) * 100;
      reportProgress(currentProgress);
      
      return response;
    }).catch(error => {
      // Log real errors for debugging
      console.error('Chunk upload error:', error);
      if (error instanceof Error && error.message.includes('Property could not be processed')) {
        console.error('Backend processing error - likely S3 failure:', error);
      }
      throw error;
    });

    uploadPromises.push(uploadPromise);

    // Process in batches with reduced concurrency and completion check
    if (uploadPromises.length >= concurrentUploads || i === chunks.length - 1) {
      try {
        const results = await Promise.all(uploadPromises);
        
        // Check if any upload failed
        const failedUpload = results.find(result => !result.success);
        if (failedUpload) {
          // Log specific error for debugging
          if (failedUpload.message?.includes('Property could not be processed')) {
            console.error('Backend processing error - likely S3 failure:', failedUpload.message);
          }
          return failedUpload;
        }
        
        // Check if upload is completed - stop further uploads
        if (uploadCompleted) {
          console.log('Stopping further uploads - upload completed');
          break;
        }
        
        // Clear the batch
        uploadPromises.length = 0;
        
        // Add small delay to prevent server timeouts
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error('Chunk upload batch failed:', error);
        // Handle stream resource errors specifically
        if (error instanceof Error && error.message.includes('stream resource')) {
          return {
            success: false,
            message: 'Video upload failed due to file processing error. Please try again with a smaller file or different format.'
          };
        }
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Upload failed during chunk processing'
        };
      }
    }
  }

  // Ensure final progress is 100%
  if (lastReportedProgress < 100 && input.onProgress) {
    input.onProgress({
      uploadId,
      chunkNumber: totalChunks,
      totalChunks,
      percent: 100,
    });
  }

  // Return the last successful chunk response, not a placeholder
  return lastChunkResponse;
}

/*
Example usage:

const clientOptions = {
  baseUrl: "https://your-domain.com",
  token: "<jwt-token>",
  endpointBuilder: (propertyId) => `/api/property/${propertyId}/step2`,
};

const result = await uploadPropertyStep2VideoWithChunks(clientOptions, {
  propertyId: 123,
  images: [file1, file2],
  videoFile,
  chunkSizeBytes: 5 * 1024 * 1024,
  onProgress: ({ percent }) => console.log(percent),
});

if (result.success && result.data.status === "completed") {
  console.log("Final URL:", result.data.video_url);
}
*/

// ============================================================================
// REPLACE VIDEO FUNCTIONALITY
// ============================================================================

export interface ReplaceVideoInitData {
  property_id: number;
  upload_id: string;
  total_chunks: number;
  status: UploadStatus;
}

export interface ReplaceVideoChunkData {
  upload_id: string;
  chunk_number?: number;
  received_chunks?: number;
  total_chunks?: number;
  status: UploadStatus;
  video_url?: string;
}

export interface ReplaceVideoClientOptions {
  baseUrl: string;
  token: string;
}

export interface InitReplaceVideoInput {
  propertyId: number | string;
  videoFileName: string;
  totalChunks: number;
  fileSize: number;
  shouldReplace?: "yes" | "no";
}

export interface UploadReplaceChunkInput {
  propertyId: number | string;
  uploadId: string;
  chunkNumber: number;
  chunkFile: File;
  chunkFileName?: string;
}

export interface ReplaceVideoWithChunksInput {
  propertyId: number | string;
  videoFile: File;
  chunkSizeBytes?: number;
  onProgress?: (progress: {
    uploadId: string;
    chunkNumber: number;
    totalChunks: number;
    percent: number;
  }) => void;
}

function getReplaceVideoInitUrl(baseUrl: string, propertyId: number | string): string {
  return `${normalizeBaseUrl(baseUrl)}/property/${propertyId}/replace-video`;
}

function getReplaceVideoChunkUrl(baseUrl: string, propertyId: number | string): string {
  return `${normalizeBaseUrl(baseUrl)}/property/${propertyId}/upload-video-chunk`;
}

async function postReplaceVideoFormData<T>(url: string, token: string, formData: FormData): Promise<ApiResponse<T>> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status === 401 || response.status === 403) {
    console.warn(`Authentication failed (${response.status}): User may be deleted or token invalid`);
    return {
      success: false,
      message: "Authentication failed - user may be deleted or session expired"
    };
  }

  const json = (await response.json()) as ApiResponse<T>;

  if (!response.ok && json && typeof json === "object") {
    return json;
  }

  return json;
}

export async function initReplaceVideoUpload(
  options: ReplaceVideoClientOptions,
  input: InitReplaceVideoInput,
): Promise<ApiResponse<ReplaceVideoInitData>> {
  const url = getReplaceVideoInitUrl(options.baseUrl, input.propertyId);

  const formData = new FormData();
  formData.append("property_id", String(input.propertyId));
  formData.append("should_replace", input.shouldReplace ?? "yes");
  formData.append("video_name", input.videoFileName);
  formData.append("total_chunks", String(input.totalChunks));
  formData.append("file_size", String(input.fileSize));

  return postReplaceVideoFormData<ReplaceVideoInitData>(url, options.token, formData);
}

export async function uploadReplaceVideoChunk(
  options: ReplaceVideoClientOptions,
  input: UploadReplaceChunkInput,
): Promise<ApiResponse<ReplaceVideoChunkData>> {
  const url = getReplaceVideoChunkUrl(options.baseUrl, input.propertyId);
  const fileName = input.chunkFileName ?? "chunk.mp4";

  const formData = new FormData();
  formData.append("property_id", String(input.propertyId));
  formData.append("upload_id", input.uploadId);
  formData.append("chunk_number", String(input.chunkNumber));
  formData.append("video_chunk", input.chunkFile, fileName);

  return postReplaceVideoFormData<ReplaceVideoChunkData>(url, options.token, formData);
}

export async function replacePropertyVideoWithChunks(
  options: ReplaceVideoClientOptions,
  input: ReplaceVideoWithChunksInput,
): Promise<ApiResponse<ReplaceVideoChunkData>> {
  const chunkSize = input.chunkSizeBytes ?? DEFAULT_CHUNK_SIZE;
  const chunks = splitFileIntoChunkFiles(
    input.videoFile,
    chunkSize,
    () => input.videoFile.name,
  );

  const initResponse = await initReplaceVideoUpload(options, {
    propertyId: input.propertyId,
    videoFileName: input.videoFile.name,
    totalChunks: chunks.length,
    fileSize: input.videoFile.size,
    shouldReplace: "yes",
  });

  if (!initResponse.success) {
    return initResponse;
  }

  const uploadId = initResponse.data.upload_id;
  const totalChunks = initResponse.data.total_chunks;

  let lastChunkResponse: ApiResponse<ReplaceVideoChunkData> = {
    success: true,
    data: {
      upload_id: uploadId,
      status: "pending",
      total_chunks: totalChunks,
      received_chunks: 0,
    },
  };

  const concurrentUploads = 2;
  const uploadPromises: Promise<ApiResponse<ReplaceVideoChunkData>>[] = [];
  let completedChunks = 0;
  let lastReportedProgress = 0;
  let uploadCompleted = false;

  const reportProgress = (currentProgress: number) => {
    const roundedProgress = Math.round(currentProgress / 5) * 5;

    if (roundedProgress > lastReportedProgress && roundedProgress <= 100) {
      lastReportedProgress = roundedProgress;

      if (input.onProgress) {
        input.onProgress({
          uploadId,
          chunkNumber: completedChunks,
          totalChunks,
          percent: roundedProgress,
        });
      }
    }
  };

  for (let i = 0; i < chunks.length; i++) {
    const chunkNumber = i + 1;

    const uploadPromise = uploadReplaceVideoChunk(options, {
      propertyId: input.propertyId,
      uploadId,
      chunkNumber,
      chunkFile: chunks[i],
      chunkFileName: input.videoFile.name,
    }).then((response) => {
      completedChunks++;

      if (response.success && response.data?.status === "completed") {
        uploadCompleted = true;
      }

      if (response.success) {
        lastChunkResponse = response;
      }

      reportProgress((completedChunks / totalChunks) * 100);
      return response;
    }).catch((error) => {
      console.error("Replace video chunk upload error:", error);
      throw error;
    });

    uploadPromises.push(uploadPromise);

    if (uploadPromises.length >= concurrentUploads || i === chunks.length - 1) {
      try {
        const results = await Promise.all(uploadPromises);
        const failedUpload = results.find((result) => !result.success);

        if (failedUpload) {
          return failedUpload;
        }

        if (uploadCompleted) {
          break;
        }

        uploadPromises.length = 0;
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error("Replace video chunk upload batch failed:", error);
        return {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "Video replacement failed during chunk processing",
        };
      }
    }
  }

  if (lastReportedProgress < 100 && input.onProgress) {
    input.onProgress({
      uploadId,
      chunkNumber: totalChunks,
      totalChunks,
      percent: 100,
    });
  }

  return lastChunkResponse;
}
