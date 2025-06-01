import React, { useRef } from "react";

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onDrop(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Crucial
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onDrop(Array.from(e.target.files));
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-full p-4 border-2 border-dashed border-gray-400 text-center rounded-md cursor-pointer hover:bg-gray-50"
    >
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      Drag & drop your file here, or click to browse
    </div>
  );
};
