import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateBlogCategoryMutation, useUpdateBlogCategoryMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function AddCategoryDialog({
  dialogController,
  editAbleCategory
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleCategory?: {
    id: number;
    name: string; 
    status: "active" | "inactive";
  }
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({ 
    name: editAbleCategory?.name || "",
    status: editAbleCategory?.status === "active",
  });

  const { mutateAsync: createCategory, isPending: isCreating } = useCreateBlogCategoryMutation()
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateBlogCategoryMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleCategory
        ? updateCategory({ id: editAbleCategory.id, name: formState.name, status: formState.status }, {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating category:", error);
            },
          })
        :
      createCategory({ categoryName: formState.name, status: formState.status } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating category:", error);
        },
      }),
      {
        loading: "Creating category...",
        success: "Category created successfully!",
        error: "Error creating category.",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
        className="fixed bg-white rounded-xl p-6 max-w-md w-full mx-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Add Category</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Category Name</Label>
              <Switch 
                className="cursor-pointer" 
                checked={formState.status} 
                onCheckedChange={(checked: boolean) => setFormState({ ...formState, status: checked })} 
                disabled={isCreating || isUpdating} 
                />
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="name"
              name="name"
              type="text"
              className="w-full"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleCategory ? "Update" : "Create"}
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
// {
//     dialogController,
// }:{
//     dialogController: [boolean, (open: boolean) => void]
// }