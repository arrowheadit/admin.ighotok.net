// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  X } from "lucide-react";
// import { useCreatePageMutation,useUpdatePageMutation } from "@/mutations";
// import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import type { PageItem } from "@/types/pages";

// import { Switch } from "@/components/ui/switch";
// import { JsonParse,snackCaseToUpperCase } from "@/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
export default function EditPageSectionDialog({
  dialogController,
  editAblePage,
}: {
  dialogController: [boolean, (isSectionOpen: boolean) => void]
  editAblePage?: PageItem
}) {
  const [isSectionOpen, setOpen] = dialogController;
  const [formState, setFormState] = useState<PageItem>({
    id: Number(editAblePage?.id) || 0,
    title: editAblePage?.title || "",
    slug: editAblePage?.slug || "",
    content: editAblePage?.content || "",
    status:editAblePage?.status || "active",
  });
  type Section = {
    title?: string;
    description?: string;
    list_text?: string[];
    button?: { url: string; text: string };
    image?: { url: string; alt?: string };
    [key: string]: unknown;
  };
  const [formContent, setFormContent] = useState<Record<string, Section> | null>(null);
  useEffect(() => {
    if (editAblePage) {
      setFormState(editAblePage)
      try {
        const parsedContent = typeof editAblePage.content === "string"
          ? JSON.parse(editAblePage.content)
          : editAblePage.content;
        setFormContent(parsedContent);
      } catch {
        setFormContent(null);
      }
      console.log("EditAblePage Content", formContent);
      console.log("EditAblePage formState", formState);
    }
  }, [editAblePage]);


 

  return (
    <Dialog open={isSectionOpen} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
        className="fixed bg-white rounded-xl p-6 max-w-md w-full mx-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Update Section of {editAblePage?.title} </DialogTitle>

       <Accordion type="multiple" className="w-full">
      {Object.entries(formContent ?? {}).map(([key, section]) => {
        if (!section.title) return null

        return (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                {section.description && <p>{section.description}</p>}

                {section.list_text && section.list_text?.length > 0 && (
                  <ul className="list-disc list-inside">
                    {section.list_text?.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.button && (
                  <a href={section.button.url} className="text-blue-600 underline">
                    {section.button.text}
                  </a>
                )}

                {section.image?.url && (
                  <img
                    src={section.image.url}
                    alt={section.image.alt || 'Section image'}
                    className="rounded-md mt-2"
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
        <DialogClose asChild>
          <Button
            variant={"ghost"}
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
            //disabled={isCreating || isUpdating}
          >
            {/* {isCreating || isUpdating ? <LoaderCircle className="animate-spin"/> : <X />} */}
            <X className="h-5 w-5" />
          </Button>
        </DialogClose>
      </div>
    </Dialog>
  );
}
