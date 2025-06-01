import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateEducationSubjectMutation,useUpdateEducationSubjectMutation } from "@/mutations";
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
export default function AddEducationSubjectDialog({
  dialogController,
  editAbleEducationSubject,
  educationOptions  
}: {
  dialogController: [boolean, (open: boolean) => void]
  educationOptions: { value: number; label: string }[]
  editAbleEducationSubject?: {
    id: number;
    name: string; 
    education_id: number;
  }
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({
    name: editAbleEducationSubject?.name || "",
    education_id: editAbleEducationSubject?.education_id || ""
  });

  const { mutateAsync: createEducationSubject, isPending: isCreating } = useCreateEducationSubjectMutation()
  const { mutateAsync: updateEducationSubject, isPending: isUpdating } = useUpdateEducationSubjectMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleEducationSubject
        ? updateEducationSubject({ id: editAbleEducationSubject.id, name: formState.name , education_id: Number(formState.education_id) }, {
            onSuccess: () => {
            setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating education subject:", error);
            },
          })
        :
      createEducationSubject({ name: formState.name , education_id: Number(formState.education_id) }, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating education subject:", error);
        },
      }),
      {
        loading: editAbleEducationSubject
        ? "Updating Education Subject..."
        : "Creating Education Subject...",
        success: editAbleEducationSubject
        ? "Education Subject updated successfully!"
        : "Education Subject created successfully!",
        error: editAbleEducationSubject
        ? "Error updating Education Subject"
        : "Error creating Education Subject",
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
        <DialogTitle className="text-xl font-semibold">Add Education Subject</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Degree</Label>              
            </div>
            <Select
              disabled={isCreating || isUpdating}
              defaultValue={editAbleEducationSubject?.education_id.toString()}
              onValueChange={(value) => setFormState({ ...formState, education_id: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Degree" />
              </SelectTrigger>
            <SelectContent>
              {educationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Education Subject</Label>              
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
              {editAbleEducationSubject ? "Update" : "Create"}
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
