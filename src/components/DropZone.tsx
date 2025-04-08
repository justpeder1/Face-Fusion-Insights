
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DropZoneProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

export const DropZone = ({ onImageUpload, className }: DropZoneProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageUpload(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const clearImage = () => {
    setPreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/10" : "hover:border-primary/50 hover:bg-secondary/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag & drop your image here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: JPEG, PNG, WebP
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-xl overflow-hidden border border-white/20">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full object-cover max-h-[400px]" 
            />
          </div>
          <Button 
            variant="destructive" 
            className="absolute top-2 right-2 p-2 h-8 w-8 rounded-full"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
