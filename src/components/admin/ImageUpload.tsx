"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({
  label,
  value,
  onChange,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to upload image");
        setIsUploading(false);
        return;
      }

      if (data.media?.fileUrl) {
        onChange(data.media.fileUrl);
      }
    } catch (err) {
      setError("Network error during file upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase text-[#8e8e93] font-[var(--font-lato)]">
        {label}
      </label>

      {error && (
        <div className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-4 rounded-xl bg-[#090b0e] border border-white/10">
        {/* Thumbnail Preview Container */}
        <div className="relative w-28 h-20 bg-[#121826] rounded-lg overflow-hidden shrink-0 border border-white/10 flex items-center justify-center group">
          {value ? (
            <>
              <Image
                src={value}
                alt="Uploaded preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <ImageIcon className="w-8 h-8 text-white/20" />
          )}
        </div>

        {/* Action Controls (No path text input) */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2.5 rounded-lg bg-[#06ACFE]/15 hover:bg-[#06ACFE]/25 text-[#06ACFE] text-xs font-bold font-[var(--font-lato)] flex items-center gap-2 transition-all border border-[#06ACFE]/30 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading Image...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{value ? "Change Image" : "Upload Image File"}</span>
                </>
              )}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-2.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#8e8e93] hover:text-red-400 text-xs font-medium transition-colors"
              >
                Remove Image
              </button>
            )}
          </div>

          {value ? (
            <p className="text-[11px] text-[#10b981] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Image uploaded and attached successfully
            </p>
          ) : (
            <p className="text-[11px] text-[#71717a]">
              No image attached. Click button above to select an image from your computer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
