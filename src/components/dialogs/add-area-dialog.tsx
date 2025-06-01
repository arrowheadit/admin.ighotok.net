import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateAreaMutation,useUpdateAreaMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import type { AreaItem, UpazilaOptions } from "@/types/geo-location";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function AddAreaDialog({
  dialogController,
  editAbleArea,
  upazilaOptions 
}: {
  dialogController: [boolean, (open: boolean) => void]
  upazilaOptions: UpazilaOptions[]
  editAbleArea?: AreaItem
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({
    name: editAbleArea?.name || "",
    upazila_id: editAbleArea?.upazila_id || "",
    bn_name: editAbleArea?.bn_name || "",
    url: editAbleArea?.url || "",
    is_active:editAbleArea?.is_active || false,
  });

  const { mutateAsync: createArea, isPending: isCreating } = useCreateAreaMutation()
  const { mutateAsync: updateArea, isPending: isUpdating } = useUpdateAreaMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleArea
        ? updateArea(
          {
            id: editAbleArea.id,
            name: formState.name,
            bn_name: formState.bn_name,
            upazila_id: Number(formState.upazila_id),
            url: formState.url,
            is_active: Boolean(formState.is_active),            
          }, {
            onSuccess: () => {
            setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Area:", error);
            },
          })
        :
        createArea({
            name: formState.name,
            bn_name: formState.bn_name,
            upazila_id: Number(formState.upazila_id),
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
        loading: editAbleArea
        ? "Updating Area..."
        : "Creating Area...",
        success: editAbleArea
        ? "Area updated successfully!"
        : "Area created successfully!",
        error: editAbleArea
        ? "Error updating Area"
        : "Error creating Area",
      }
    );
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
        <DialogTitle className="text-xl font-semibold">Add Area</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>              
            </div>
            <Select
              disabled={isCreating || isUpdating}
              defaultValue={editAbleArea?.upazila_id.toString()}
              onValueChange={(value) => setFormState({ ...formState, upazila_id: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Upazila" />
              </SelectTrigger>
            <SelectContent>
              {upazilaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Area</Label>              
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
              {editAbleArea ? "Update" : "Create"}
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
