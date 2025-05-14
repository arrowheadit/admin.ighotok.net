import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useCreateBlogTagMutation, useUpdateBlogTagMutation } from "@/mutations";

export default function AddTagDialog({
  dialogController,
  editAbleTag
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleTag?: {
    id: number;
    name: string; 
    status: "active" | "inactive";
  }
}) {
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState({ 
    name: editAbleTag?.name || "",
    status: editAbleTag?.status === "active",
  });

  console.log("editAbleTag", editAbleTag);
  

  const { mutateAsync: createTag, isPending: isCreating } = useCreateBlogTagMutation()
  const { mutateAsync: updateTag, isPending: isUpdating } = useUpdateBlogTagMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleTag
        ? updateTag({ id: editAbleTag.id, name: formState.name, status: formState.status }, {
            onSuccess: () => setOpen(false),
            onError: (error) => console.error("Error updating tag:", error)
          })
        : createTag({ name: formState.name, status: formState.status }, {
            onSuccess: () => setOpen(false),
            onError: (error) => console.error("Error creating tag:", error)
          }),
      {
        loading: "Saving tag...",
        success: "Tag saved successfully!",
        error: "Error saving tag.",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div className="fixed bg-white rounded-xl p-6 max-w-md w-full mx-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <DialogTitle className="text-xl font-semibold">{editAbleTag ? "Edit Tag" : "Add Tag"}</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name" className="block mb-2 font-medium">Tag Name</Label>
                <Switch
                    className="cursor-pointer"
                    checked={formState.status} 
                    onCheckedChange={(checked: boolean) => setFormState({ ...formState, status: checked })} 
                    disabled={isCreating || isUpdating} 
                />
            </div>
            <Input id="name" name="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} disabled={isCreating || isUpdating} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>Cancel</Button>
            <Button type="submit" disabled={isCreating || isUpdating}>{isCreating || isUpdating ? <LoaderCircle className="animate-spin"/> : (editAbleTag ? "Update" : "Create")}</Button>
          </div>
        </form>

        <DialogClose asChild>
          <Button variant="ghost" onClick={() => setOpen(false)} className="absolute top-4 right-4" disabled={isCreating || isUpdating}>{isCreating || isUpdating ? <LoaderCircle className="animate-spin" /> : <X />}</Button>
        </DialogClose>
      </div>
    </Dialog>
  );
}
