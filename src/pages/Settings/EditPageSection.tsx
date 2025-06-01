import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PencilLine, X,List } from "lucide-react";
import { snackCaseToUpperCase } from "@/utils";
import { useUpdatePageContentMutation } from "@/mutations";
import { AccordionContentEditor } from "@/components/pages/AccordionContentEditor"; 
import { toast } from "sonner";

export function EditPageSection() {
  const location = useLocation();
  const pageData = location.state;
  const { mutateAsync: updatePageContent } = useUpdatePageContentMutation();

  const [formContent, setFormContent] = useState<Record<string, unknown> | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ key: string; loading: boolean }>({ key: "", loading: false });

  useEffect(() => {
    if (pageData) {
      try {
        const parsed = typeof pageData.content === "string" ? JSON.parse(pageData.content) : pageData.content;
        setFormContent(parsed);
      } catch {
        setFormContent(null);
      }
    }
  }, [pageData]);

  const handleValueChange = (value: string | null) => setOpenItem(value);

  // const handleChange = (section: string, path: string, value: unknown) => {
  //   setFormContent((prev) => {
  //     if (!prev) return prev;
  //     const updated = { ...prev[section] };
  //     const keys = path.split(".");
  //     let target = updated;
  //     for (let i = 0; i < keys.length - 1; i++) {
  //       target[keys[i]] = { ...target[keys[i]] };
  //       target = target[keys[i]];
  //     }
  //     target[keys.at(-1)!] = value;
  //     return {
  //       ...prev,
  //       [section]: updated,
  //     };
  //   });
  // };
  const handleChange = (section: string, path: string, value: unknown) => {
  setFormContent((prev) => {
    if (!prev) return prev;

    const currentSection = prev[section];
    if (typeof currentSection !== "object" || currentSection === null) return prev;

    const updatedSection = structuredClone(currentSection) as Record<string, unknown>;

    const keys = path.split(".");
    let target = updatedSection;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (typeof target[key] !== "object" || target[key] === null) {
        target[key] = {};
      }
      target = target[key] as Record<string, unknown>;
    }

    target[keys.at(-1)!] = value;

    return {
      ...prev,
      [section]: updatedSection,
    };
  });
};


  const handleSave = async (key: string) => {
    if (!formContent) return;
    setIsLoading({ key, loading: true });
    try {
      toast.promise(
        updatePageContent({ formContent: formContent, pageSlug: pageData.slug }
        , {
          onSuccess: (data) => { 
            if (data.data?.message) {
              toast.success(data.data?.message);
            }
            // console.log("Page content updated successfully", data.data?.message);
            },
          onError: (error) => {
            toast.error("Something went wrong! Please try again later.");
              console.error("Error updating page content:", error);
            },
          })
      )
      
    } catch (err) {
      console.error("Error updating section:", err);
    } finally {
      setIsLoading({ key: "", loading: false });
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Page Section</h1>
        <Button variant="default" asChild>
          <a href="/settings/pages">
            <List />
            Pages
          </a>
        </Button>
      </div>
      <Accordion type="single" collapsible value={openItem ?? undefined} onValueChange={handleValueChange} className="my-4 space-y-2">
        {formContent &&
          Object.entries(formContent).map(([key, value], index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-md px-4">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex w-full justify-between items-center py-4 font-medium hover:underline">
                  {snackCaseToUpperCase(key)}
                  {openItem === `item-${index}` ? (
                    <div className="flex items-center gap-1 mx-2">
                      <X className="h-5 w-5 text-muted-foreground" />
                      <span>Close</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mx-2">
                      <PencilLine className="h-5 w-5 text-muted-foreground" />
                      <span>Edit</span>
                    </div>
                  )}
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent>
                <AccordionContentEditor
                  section={key}
                  data={value}
                  onChange={handleChange}
                  isLoading={isLoading.key === key && isLoading.loading}
                />
                <Button
                  className="my-3 ml-5"
                  variant="default"
                  size="lg"
                  disabled={isLoading.key === key && isLoading.loading}
                  onClick={() => handleSave(key)}
                >
                  {isLoading.key === key && isLoading.loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </section>
  );
}
