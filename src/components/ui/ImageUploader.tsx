import { useState } from "react";
import { Label } from "@/components/ui/label";
import { DropZone } from "@/components/ui/DropZone";

interface ImageUploaderProps {
  label?: string;
  image?: string;
  onChange: (data: { file: string; alt?: string }) => void;
}

export const ImageUploader = ({
  label = "Image",
  image,
  onChange,
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(image || null);
  const [alt, setAlt] = useState("");

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange({ file: base64, alt });
    };
    reader.readAsDataURL(file);
  };

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlt(e.target.value);
    onChange({ file: preview || "", alt: e.target.value });
  };

  return (
    <div className="space-y-4">
      <Label className="block">{label}</Label>

      {preview && (
        <div className="w-full max-w-xs border rounded-md overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-auto object-cover" />
        </div>
      )}

      <DropZone onDrop={handleDrop} />

      <input
        type="text"
        value={alt}
        onChange={handleAltChange}
        placeholder="Alt text"
        className="input w-full"
      />
    </div>
  );
};
