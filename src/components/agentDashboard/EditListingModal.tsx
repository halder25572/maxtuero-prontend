"use client";

import { useState } from "react";
import { ArrowUpRight, DollarSign, Home, ImagePlus, MapPin, Pencil, Plus, X } from "lucide-react";

export type ListingModalData = {
    id: string;
    title: string;
    location: string;
    price: string;
    status: string;
    image: string;
    images?: string[];
};

type EditListingModalProps = {
    listing: ListingModalData;
    onClose: () => void;
};

export default function EditListingModal({ listing, onClose }: EditListingModalProps) {
    const [step, setStep] = useState(1);
    const maxImages = 10;
    const [images, setImages] = useState(() => {
        const initialImages = listing.images?.length ? listing.images : [listing.image];
        return initialImages.slice(0, maxImages);
    });
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const imageSlots = Array.from({ length: maxImages }, (_, index) => images[index]);

    const steps = [
        { id: 1, label: "Basic Info" },
        { id: 2, label: "Location" },
        { id: 3, label: "Media" },
    ];

    const updateImageAtIndex = (index: number, file: File | null) => {
        if (!file) {
            return;
        }

        setActiveImageIndex(index);
        setImages((current) => current.map((image, currentIndex) => (currentIndex === index ? URL.createObjectURL(file) : image)));
    };

    const addImage = (file: File | null) => {
        if (!file) {
            return;
        }

        setImages((current) => {
            if (current.length >= maxImages) {
                return current;
            }

            const next = [...current, URL.createObjectURL(file)];
            setActiveImageIndex(next.length - 1);
            return next;
        });
    };

    const removeImageAtIndex = (index: number) => {
        setImages((current) => {
            if (current.length <= 1) {
                return current;
            }

            const next = current.filter((_, currentIndex) => currentIndex !== index);
            setActiveImageIndex((currentActive) => Math.min(currentActive, next.length - 1));
            return next;
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Edit Listing</p>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{listing.title}</h3>
                    </div>
                    <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Property Images</p>
                                <p className="text-xs text-gray-400 mt-1">Update up to {maxImages} images individually.</p>
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500 border border-gray-100">
                                <ImagePlus size={13} />
                                {images.length}/{maxImages}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                                {images[activeImageIndex] ? (
                                    <img
                                        src={images[activeImageIndex]}
                                        alt={`${listing.title} preview`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-400">
                                        No image selected
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <div
                                        key={`${image}-${index}`}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`relative w-28 h-20 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer group ${activeImageIndex === index ? "border-primary-500" : "border-gray-200"}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${listing.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                        <label
                                            className="absolute left-1.5 bottom-1.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-gray-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <Pencil size={11} />
                                            Change
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(event) => updateImageAtIndex(index, event.target.files?.[0] ?? null)}
                                            />
                                        </label>

                                        {images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    removeImageAtIndex(index);
                                                }}
                                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                aria-label={`Remove image ${index + 1}`}
                                            >
                                                <X size={13} />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {images.length < maxImages && (
                                    <label className="w-28 h-20 shrink-0 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-primary-400 transition-colors">
                                        <Plus size={16} className="text-gray-400" />
                                        <span className="text-[11px] font-semibold text-gray-500">Add</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(event) => addImage(event.target.files?.[0] ?? null)}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 overflow-x-auto pb-1">
                        {steps.map((s, index) => (
                            <div key={s.id} className="flex items-center gap-1 shrink-0">
                                <button type="button" onClick={() => setStep(s.id)} className="flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > s.id
                                            ? "bg-green-500 text-white"
                                            : step === s.id
                                                ? "bg-primary-600 text-white"
                                                : "bg-gray-100 text-gray-400"
                                        }`}>
                                        {step > s.id ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        ) : (
                                            s.id
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${step === s.id ? "text-gray-900 font-semibold" : "text-gray-400"}`}>
                                        {s.label}
                                    </span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className={`w-6 h-px mx-1 ${step > s.id ? "bg-green-300" : "bg-gray-200"}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        {step === 1 && (
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Home size={14} className="text-primary-600" />
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-base">Basic Information</h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Property Title</label>
                                        <input
                                            type="text"
                                            defaultValue={listing.title}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Listing Type</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors text-gray-700 appearance-auto">
                                            <option>For Sale</option>
                                            <option>For Fair</option>
                                            <option>Raffle</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Property Price ($)</label>
                                        <div className="relative">
                                            <DollarSign size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                defaultValue={listing.price.replace(/[^0-9]/g, "")}
                                                placeholder="2,500,000"
                                                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bedrooms</label>
                                            <input type="number" defaultValue={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bathrooms</label>
                                            <input type="number" defaultValue={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Sq Ft</label>
                                            <input type="number" defaultValue={2400} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Description</label>
                                        <textarea
                                            rows={5}
                                            defaultValue={`Beautiful property at ${listing.location}`}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors placeholder:text-gray-300 resize-y"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <MapPin size={14} className="text-primary-600" />
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-base">Location</h2>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Address</label>
                                        <input type="text" defaultValue={listing.location} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">City</label>
                                            <input type="text" defaultValue="Miami" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">State</label>
                                            <input type="text" defaultValue="FL" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">ZIP Code</label>
                                            <input type="text" defaultValue="33139" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Country</label>
                                            <input type="text" defaultValue="United States" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-600 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl overflow-hidden h-36 relative">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            loading="lazy"
                                            src="https://maps.google.com/maps?q=Miami+FL&output=embed"
                                            className="border-0 opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <p className="text-gray-400 text-sm bg-white/80 px-3 py-1 rounded-full">Or Directly Select With Google Map</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-base">Media Upload</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Property Images</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {imageSlots.map((image, index) => {
                                                const slotLabel = `Image ${index + 1}`;

                                                if (image) {
                                                    return (
                                                        <div key={`${slotLabel}-${index}`} className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
                                                            <img
                                                                src={image}
                                                                alt={`${listing.title} ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors" />
                                                            <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                                                                    <Pencil size={13} />
                                                                    Replace
                                                                </span>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(event) => updateImageAtIndex(index, event.target.files?.[0] ?? null)}
                                                                />
                                                            </label>
                                                            {images.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImageAtIndex(index)}
                                                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    aria-label={`Remove ${slotLabel}`}
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <label
                                                        key={`${slotLabel}-${index}`}
                                                        className="relative aspect-square rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-400 transition-colors"
                                                    >
                                                        <Plus size={18} className="text-gray-400" />
                                                        <span className="text-xs font-semibold text-gray-500">Add {slotLabel}</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(event) => addImage(event.target.files?.[0] ?? null)}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Every occupied slot can be replaced individually. You can keep up to {maxImages} images total.</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">Video Walkthrough</label>
                                        <label className="block border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-primary-400 transition-colors">
                                            <input type="file" accept="video/*" className="hidden" />
                                            <div className="flex flex-col items-center justify-center py-12 bg-white">
                                                <div className="mb-3 text-gray-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-medium text-gray-600">Click to upload video</p>
                                                <p className="text-xs text-gray-400 mt-1">MP4, MOV up to 500MB</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="flex justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setStep((current) => Math.max(1, current - 1))}
                            className={`flex items-center gap-2 border border-gray-200 text-gray-500 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors ${step === 1 ? "invisible" : ""}`}
                        >
                            ← Previous
                        </button>

                        <div className="ml-auto flex gap-3">
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={() => setStep((current) => Math.min(3, current + 1))}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                                >
                                    Next <ArrowUpRight size={15} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
                                >
                                    Save Changes <ArrowUpRight size={15} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}