import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { snackCaseToUpperCase } from "@/utils";
import { ImageUploader } from "@/components/ui/ImageUploader";

type FieldRendererProps = {
  section: string;
  path: string;
  value: unknown;
  onChange: (section: string, path: string, value: unknown) => void;
};

export const FieldRenderer = ({ section, path, value, onChange }: FieldRendererProps) => {
  const key = path.split(".").pop() || "";
  const label = snackCaseToUpperCase(key);
  const name = `${section}.${path}`;

  const parentPath = path.replace(/\.url$|\.alt$/, "");

  // ✅ Render ImageUploader ONCE for a combined image object
  if (
    path.endsWith(".url") &&
    typeof value === "string" &&
    path.includes("image")
  ) {
    return (
      <ImageUploader
        label={label}
        image={value as string}
        onChange={(data) => {
          onChange(section, `${parentPath}.url`, data.file);
          onChange(section, `${parentPath}.alt`, data.alt || "");
        }}
      />
    );
  }

  if (key === "textarea") {
    return (
      <div className="w-full">
        <label className="block mb-1 text-sm font-medium">{label}</label>
        <Textarea
          name={name}
          value={String(value)}
          onChange={(e) => onChange(section, path, e.target.value)}
        />
      </div>
    );
  }

  if (key === "is_active") {
    return (
      <div className="flex items-center gap-2">
        <label>{label}</label>
        <Switch
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(section, path, checked)}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <Input
        name={name}
        value={String(value)}
        disabled={key === "icon"}
        onChange={(e) => onChange(section, path, e.target.value)}
      />
    </div>
  );
};
