import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreatePageMutation,useUpdatePageMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
<<<<<<< HEAD
import type { PageItem,CreatePageItem } from "@/types/pages";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
=======
import type { PageItem } from "@/types/pages";
import { Switch } from "@/components/ui/switch";
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
export default function AddPageDialog({
  dialogController,
  editAblePage,
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAblePage?: PageItem
}) {
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState<PageItem>({
    id: Number(editAblePage?.id) || 0,
    title: editAblePage?.title || "",
    slug: editAblePage?.slug || "",
    content: editAblePage?.content || "",
    status:editAblePage?.status || "active",
  });
<<<<<<< HEAD
   // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState({
        ...formState,
        [name]: value,
      });
      // Clear error when field is edited
      if (errors[name as keyof CreatePageItem]) {
        setErrors({
          ...errors,
          [name]: undefined,
        });
      }
    };
const [errors, setErrors] = useState<Partial<Record<keyof CreatePageItem, string>>>({});
=======

>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
  const { mutateAsync: createPage, isPending: isCreating } = useCreatePageMutation()
  const { mutateAsync: updatePage, isPending: isUpdating } = useUpdatePageMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAblePage
        ? updatePage(
          {
            id: editAblePage.id,
            title: formState.title,
            slug: formState.slug,
            content: formState.content,
            status: formState.status,            
          }, {
            onSuccess: () => {
            setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Page:", error);
            },
          })
        :
        createPage({
            title: formState.title,
            slug: formState.slug,
            content: formState.content,
            status: formState.status,  
        }, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating Page:", error);
        },
      }),
      {
        loading: editAblePage
        ? "Updating Page..."
        : "Creating Page...",
        success: editAblePage
        ? "Page updated successfully!"
        : "Page created successfully!",
        error: editAblePage
        ? "Error updating Page"
        : "Error creating Page",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
<<<<<<< HEAD
       className="fixed top-10 left-1/2 transform -translate-x-1/2 
               bg-white rounded-xl p-6 max-w-md w-full z-50 
               max-h-[calc(100vh-5rem)] overflow-y-auto"
=======
        className="fixed bg-white rounded-xl p-6 max-w-md w-full mx-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Add Page</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">         
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Title</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="title"
              name="title"
              type="text"
              className="w-full"
              required
              value={formState.title}
<<<<<<< HEAD
              onChange={handleInputChange}
=======
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
            />
          </div>
          {/* <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Slug</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="slug"
              name="slug"
              type="text"
              className="w-full"
              required
              value={formState.slug}
              onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
            />
          </div> */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Content</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="url"
              name="url"
              type="text"
              className="w-full"
              required
              value={formState.content}
<<<<<<< HEAD
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content"
                name="content"
                placeholder="Enter Page Content"
                className="min-h-[200px]"
                value={formState.content}
               onChange={(e) => setFormState({ ...formState, content: e.target.value })}
              />
              {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
            </div>
=======
              onChange={(e) => setFormState({ ...formState, content: e.target.value })}
            />
          </div>
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
           <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Status</Label>              
            </div>
            <Switch
                  className="cursor-pointer"
                  checked={formState.status=="active"?true:false} 
                  onCheckedChange={(checked: boolean) => setFormState({ ...formState, status: checked?"active":"inactive" })} 
                  disabled={isCreating || isUpdating} 
                />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAblePage ? "Update" : "Create"}
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
