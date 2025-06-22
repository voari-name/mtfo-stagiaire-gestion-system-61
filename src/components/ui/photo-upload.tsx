
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface PhotoUploadProps {
  onPhotoChange: (photo: string | null) => void;
  currentPhoto?: string;
}

export const PhotoUpload = ({ onPhotoChange, currentPhoto }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg relative">
        {preview ? (
          <div className="relative w-full h-full">
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              onClick={handleRemove}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Photo</p>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="photo-upload"
      />
      <label htmlFor="photo-upload">
        <Button type="button" variant="outline" size="sm" asChild>
          <span className="cursor-pointer">Choisir une photo</span>
        </Button>
      </label>
    </div>
  );
};
