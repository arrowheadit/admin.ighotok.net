import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateOurTeamsMutation, useUpdateOurTeamsMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import type { createOurTeams, updateOurTeams } from "@/types/our-teams.d";

export default function AddOurTeamDialog({
  dialogController,
  editAbleOurTeam
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleOurTeam?: updateOurTeams
}) {
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState<updateOurTeams>({ 
    id: Number(editAbleOurTeam?.id) || 0,
    name: editAbleOurTeam?.name || "",
    image: editAbleOurTeam?.image || "",
    designation: editAbleOurTeam?.designation || "",
  });

  const { mutateAsync: createOurTeams, isPending: isCreating } = useCreateOurTeamsMutation()
  const { mutateAsync: updateOurTeam, isPending: isUpdating } = useUpdateOurTeamsMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log('handleSubmit clicked'); return false;
    toast.promise(
      editAbleOurTeam
        ? updateOurTeam(
          {...formState },
          {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating OurTeam:", error);
            },
          })
        :
      createOurTeams({...formState } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating Team Member:", error);
        },
      }),
      {
        loading: editAbleOurTeam?"Updating Our Team...":"Creating Our Team...",
        success: editAbleOurTeam?"Our Team updated successfully!":"Our Team created successfully!",
        error: editAbleOurTeam?"Error Updating Our Team.":"Error creating Our Team.",
      }
    );
  };
  const [errors, setErrors] = useState<Partial<Record<keyof createOurTeams, string>>>({});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createOurTeams]) {
      setErrors({
        ...errors,
        [name as keyof createOurTeams]: undefined,
      });
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormState({
      ...formState,
      image: file || "",
    });
    console.log('handleImageChange...', formState, file);
    // Clear error when field is edited
    if (errors["image" as keyof createOurTeams]) {
      setErrors({
        ...errors,
        ["image" as keyof createOurTeams]: undefined,
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
        <DialogTitle className="text-xl font-semibold">Add New Member</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
           <div className="mb-4">
              <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>
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
          <div className="mb-4">
          <Label  htmlFor="image" className="text-sm">Image</Label>
          <Input 
              className="w-full"
              type="file"
              name="image"
              onChange={handleImageChange}
          />          
      </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleOurTeam ? "Update" : "Create"}
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
