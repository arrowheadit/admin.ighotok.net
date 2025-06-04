import { Label } from "@/components/ui/label";
import { AxiosError } from 'axios';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateLifeStoryMutation, useUpdateLifeStoryMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import type { createLifeStory, updateLifeStory } from "@/types/lifeStory";

export default function AddLifeStoryDialog({
  dialogController,
  editAbleLifeStory
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleLifeStory?: updateLifeStory
}) {
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState<updateLifeStory>({ 
    id: Number(editAbleLifeStory?.id) || 0,
    name: editAbleLifeStory?.name || "",
    image: editAbleLifeStory?.image || "",
    image_alt: editAbleLifeStory?.image_alt || "",
    description: editAbleLifeStory?.description || "",
    status: editAbleLifeStory?.status || "active" ,
  });

  const { mutateAsync: createLifeStory, isPending: isCreating } = useCreateLifeStoryMutation()
  const { mutateAsync: updateLifeStory, isPending: isUpdating } = useUpdateLifeStoryMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleLifeStory
        ? updateLifeStory(
          {
            id: editAbleLifeStory.id,
            name: formState.name,
            image: formState.image,
            image_alt: formState.image_alt,
            description: formState.description,
            status: formState.status
          },
          {
            onSuccess: () => {
              setOpen(false);
            },
            onError: () => {
            },
          })
        :
      createLifeStory({...formState } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating LifeStory:", error);
        },
      }),
      {
        loading: editAbleLifeStory?"Updating LifeStory...":"Creating LifeStory...",
        success: editAbleLifeStory?"LifeStory updated successfully!":"LifeStory created successfully!",
        error: (data: unknown) => {
          type ErrorResponse = { message?: string };
          const axiosError = data as AxiosError<ErrorResponse>;
          return editAbleLifeStory
            ? axiosError?.response?.data?.message
              ? `${axiosError.response.data.message}`
              : "Error updating LifeStory."
            : axiosError?.response?.data?.message ? `${axiosError.response.data.message}`: "Error creating LifeStory.";
        },
      }
    );
  };
  const [errors, setErrors] = useState<Partial<Record<keyof createLifeStory, string>>>({});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createLifeStory]) {
      setErrors({
        ...errors,
        [name as keyof createLifeStory]: undefined,
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
    if (errors["image" as keyof createLifeStory]) {
      setErrors({
        ...errors,
        ["image" as keyof createLifeStory]: undefined,
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
        <DialogTitle className="text-xl font-semibold">Add LifeStory</DialogTitle>

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
          <Label  htmlFor="image" className="text-sm">Image</Label>
          <Input 
              className="w-full"
              type="file"
              name="image"
              onChange={handleImageChange}
          />          
          </div>
          <div className="mb-4">
          <Label  htmlFor="image_alt" className="text-sm">Image Alt</Label>
          <Input 
              className="w-full"
              type="text"
              name="image_alt"
              value={formState.image_alt}
              onChange={handleInputChange}
          />          
      </div>
          <div className="space-y-2 mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Type your description here"
                className="min-h-[200px]"
                value={formState.description}
                onChange={handleInputChange}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleLifeStory ? "Update" : "Create"}
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
