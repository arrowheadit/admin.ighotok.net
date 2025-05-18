import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateEducationMutation, useUpdateEducationMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function AddEducationDialog({
  dialogController,
  editAbleEducation
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleEducation?: {
    id: number;
    degree: string; 
  }
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({ 
    degree: editAbleEducation?.degree || "",
  });

  const { mutateAsync: createEducation, isPending: isCreating } = useCreateEducationMutation()
  const { mutateAsync: updateEducation, isPending: isUpdating } = useUpdateEducationMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleEducation
        ? updateEducation({ id: editAbleEducation.id, degree: formState.degree }, {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating education:", error);
            },
          })
        :
      createEducation({ degree: formState.degree } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating education:", error);
        },
      }),
      {
        loading: "Creating Education...",
        success: "Education created successfully!",
        error: "Error creating education.",
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
        <DialogTitle className="text-xl font-semibold">Add Education</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Education Name</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="degree"
              name="degree"
              type="text"
              className="w-full"
              required
              value={formState.degree}
              onChange={(e) => setFormState({ ...formState, degree: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleEducation ? "Update" : "Create"}
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
