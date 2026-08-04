"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Plus, ImageIcon } from "lucide-react";

interface MultiImageUploadProps {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
}

export default function MultiImageUpload({
  label,
  values = [],
  onChange,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.media?.fileUrl) {
          uploadedUrls.push(data.media.fileUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls]);
      }
    } catch (err) {
      setError("Network error while uploading screen image(s)");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const updated = [...values];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase text-[#8e8e93] font-[var(--font-lato)]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-1.5 rounded-lg bg-[#06ACFE]/15 hover:bg-[#06ACFE]/25 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] flex items-center gap-1.5 transition-all border border-[#06ACFE]/30 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Screen Images</span>
            </>
          )}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </div>
      )}

      {/* Grid of uploaded screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#090b0e] border border-white/10 min-h-[120px] items-center">
        {values.map((url, idx) => (
          <div
            key={idx}
            className="relative h-28 bg-[#121826] rounded-lg overflow-hidden border border-white/10 group"
          >
            <Image
              src={url}
              alt={`Screen ${idx + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/75 hover:bg-red-600 text-white transition-colors opacity-0 group-hover:opacity-100"
              title="Remove screen"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Clickable Empty Add Box */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="h-28 rounded-lg border-2 border-dashed border-white/15 hover:border-[#06ACFE]/50 bg-white/5 hover:bg-[#06ACFE]/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-[#06ACFE] transition-all"
        >
          {isUploading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#06ACFE]" />
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span className="text-[11px] font-bold">Add Screen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
