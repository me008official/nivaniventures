"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export function useImageDropzone() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (uploadedImage?.preview) {
          URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [uploadedImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // Cleanup object URL memory on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage?.preview) {
        URL.revokeObjectURL(uploadedImage.preview);
      }
    };
  }, [uploadedImage]);

  const removeImage = (e) => {
    e.stopPropagation();
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
  };

  return {
    uploadedImage,
    getRootProps,
    getInputProps,
    isDragActive,
    removeImage,
  };
}