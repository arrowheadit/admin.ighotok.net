import { snackCaseToUpperCase } from "@/utils";
import { FieldRenderer } from "@/components/pages/FieldRenderer";

interface AccordionContentEditorProps {
  section: string;
  data: unknown;
  onChange: (section: string, path: string, value: unknown) => void;
  isLoading?: boolean;
  parentPath?: string;
}

export const AccordionContentEditor = ({
  section,
  data,
  onChange,
  parentPath = "",
}: AccordionContentEditorProps) => {
  if (typeof data !== "object" || data === null) return null;

  // Handle arrays
  if (Array.isArray(data)) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-2 border rounded-md">
            <AccordionContentEditor
              section={section}
              data={item}
              onChange={onChange}
              parentPath={`${parentPath}[${index}]`}
            />
          </div>
        ))}
      </div>
    );
  }

  // Handle objects
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => {
        if (key === "id") return null;

        const fullPath = parentPath ? `${parentPath}.${key}` : key;

        // Recursively render for nested objects
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return (
            <div key={fullPath} className="pl-4">
              <h4 className="font-semibold mb-2">{snackCaseToUpperCase(key)}</h4>
              <AccordionContentEditor
                section={section}
                data={value}
                onChange={onChange}
                parentPath={fullPath}
              />
            </div>
          );
        }

        // Render fields dynamically using FieldRenderer
        return (
          <div key={fullPath} className="pl-4">
            {/* <FieldRenderer
              key={key}
              section={section}
              objectKey={fullPath}
              value={value}
              onChange={onChange}
            /> */}
            <FieldRenderer
              section={section}
              path={fullPath}
              value={value}
              onChange={onChange}
            />

          </div>
        );
      })}
    </div>
  );
};
