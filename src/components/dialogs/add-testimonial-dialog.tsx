import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateTestimonialsMutation, useUpdateTestimonialsMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import type { createTestimonials, updateTestimonials } from "@/types/testimonials";

export default function AddTestimonialDialog({
  dialogController,
  editAbleTestimonial
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleTestimonial?: updateTestimonials
}) {
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState<updateTestimonials>({ 
    id: Number(editAbleTestimonial?.id) || 0,
    name: editAbleTestimonial?.name || "",
    image: editAbleTestimonial?.image || "",
    content: editAbleTestimonial?.content || "",
    designation: editAbleTestimonial?.designation || "",
    status: editAbleTestimonial?.status || "active" ,
  });

  const { mutateAsync: createTestimonial, isPending: isCreating } = useCreateTestimonialsMutation()
  const { mutateAsync: updateTestimonial, isPending: isUpdating } = useUpdateTestimonialsMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleTestimonial
        ? updateTestimonial(
          {
            id: editAbleTestimonial.id,
            name: formState.name,
            image: formState.image,
            content: formState.content,
            designation: formState.designation,
            status: formState.status
          },
          {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Testimonial:", error);
            },
          })
        :
      createTestimonial({...formState } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating Testimonial:", error);
        },
      }),
      {
        loading: editAbleTestimonial?"Updating Testimonial...":"Creating Testimonial...",
        success: editAbleTestimonial?"Testimonial updated successfully!":"Testimonial created successfully!",
        error: editAbleTestimonial?"Error updating Testimonial.":"Error creating Testimonial.",
      }
    );
  };
  const [errors, setErrors] = useState<Partial<Record<keyof createTestimonials, string>>>({});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createTestimonials]) {
      setErrors({
        ...errors,
        [name as keyof createTestimonials]: undefined,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
        className="fixed top-10 left-1/2 transform -translate-x-1/2 
               bg-white rounded-xl p-6 max-w-md w-full z-50 
               max-h-[calc(100vh-5rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Add Testimonial</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
           <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>
                <Switch
                    className="cursor-pointer"
                    checked={formState.status === "active"}
                    onCheckedChange={(checked: boolean) =>
                      setFormState({ ...formState, status: checked ? "active" : "inactive" })
                    }
                    disabled={isCreating || isUpdating}
                />
            </div>
             <Input
              disabled={isCreating || isUpdating}
              id="name"
              name="name"
              type="text"
              placeholder="Type your Name here"
              className="w-full"
              required
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>
         
          <div className="mb-4">            
            <Label htmlFor="designation" className="block mb-2 font-medium">Designation</Label>
             <Input
              disabled={isCreating || isUpdating}
              id="designation"
              name="designation"
              type="text"
              placeholder="Type your Designation here"
              className="w-full"
              required
              value={formState.designation}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 mb-4">
              <Label htmlFor="description">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Type your content here"
                className="min-h-[200px]"
                value={formState.content}
                onChange={handleInputChange}
              />
              {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleTestimonial ? "Update" : "Create"}
            </Button>
          </div>
        </form>

        <DialogClose asChild>
          <Button
            variant={"ghost"}
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? <LoaderCircle className="animate-spin"/> : <X />}
          </Button>
        </DialogClose>
      </div>
    </Dialog>
  );
}
