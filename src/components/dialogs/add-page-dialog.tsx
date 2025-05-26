import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateDivisionMutation,useUpdateDivisionMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import type { PageItem } from "@/types/pages";
import { Switch } from "@/components/ui/switch";
export default function AddPageDialog({
  dialogController,
  editAblePage,
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAblePage?: PageItem
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({
    name: editAblePage?.name || "",
    bn_name: editAblePage?.bn_name || "",
    url: editAblePage?.url || "",
    is_active:editAblePage?.is_active || false,
  });

  const { mutateAsync: createDivision, isPending: isCreating } = useCreateDivisionMutation()
  const { mutateAsync: updateDivision, isPending: isUpdating } = useUpdateDivisionMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAblePage
        ? updateDivision(
          {
            id: editAblePage.id,
            name: formState.name,
            bn_name: formState.bn_name,
            url: formState.url,
            is_active: Boolean(formState.is_active),            
          }, {
            onSuccess: () => {
            setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Division:", error);
            },
          })
        :
        createDivision({
            name: formState.name,
            bn_name: formState.bn_name,
            url: formState.url,
            is_active: Boolean(formState.is_active), 
        }, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating area:", error);
        },
      }),
      {
        loading: editAblePage
        ? "Updating Division..."
        : "Creating Division...",
        success: editAblePage
        ? "Division updated successfully!"
        : "Division created successfully!",
        error: editAblePage
        ? "Error updating Division"
        : "Error creating Division",
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
        <DialogTitle className="text-xl font-semibold">Add Division</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>              
            </div>           
          </div>
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Division</Label>              
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
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Bn Name</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="bn_name"
              name="bn_name"
              type="text"
              className="w-full"
              required
              value={formState.bn_name}
              onChange={(e) => setFormState({ ...formState, bn_name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">URL</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="url"
              name="url"
              type="text"
              className="w-full"
              required
              value={formState.url}
              onChange={(e) => setFormState({ ...formState, url: e.target.value })}
            />
          </div>
           <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Is Active</Label>              
            </div>
            <Switch
                  className="cursor-pointer"
                  checked={formState.is_active} 
                  onCheckedChange={(checked: boolean) => setFormState({ ...formState, is_active: checked })} 
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
