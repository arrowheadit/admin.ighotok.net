import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateCasteMutation, useUpdateCasteMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function AddCasteDialog({
  dialogController,
  religionOptions,
  editAbleCaste
}: {
  dialogController: [boolean, (open: boolean) => void]
  religionOptions: { value: number; label: string }[]
  editAbleCaste?: {
    id: number;
    name: string; 
    religion_id: number;
  }
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({ 
    name: editAbleCaste?.name || "",
    religion_id: editAbleCaste?.religion_id || ""
  });

  const { mutateAsync: createCaste, isPending: isCreating } = useCreateCasteMutation()
  const { mutateAsync: updateCaste, isPending: isUpdating } = useUpdateCasteMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleCaste
        ? updateCaste({ id: editAbleCaste.id, name: formState.name , religion_id: Number(formState.religion_id) }, {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating caste:", error);
            },
          })
        :
      createCaste({ casteName: formState.name , religion_id: Number(formState.religion_id) }, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating caste:", error);
        },
      }),
      {
        loading: "Creating Religion...",
        success: "Religion created successfully!",
        error: "Error creating religion.",
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
        <DialogTitle className="text-xl font-semibold">Add Caste</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Religion</Label>              
            </div>
            <Select
              disabled={isCreating || isUpdating}
              defaultValue={editAbleCaste?.religion_id.toString()}
              onValueChange={(value) => setFormState({ ...formState, religion_id: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Religion" />
              </SelectTrigger>
            <SelectContent>
              {religionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Caste Name</Label>              
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
              {editAbleCaste ? "Update" : "Create"}
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
