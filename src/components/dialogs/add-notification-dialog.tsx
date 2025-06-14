import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateNotificationMutation, useUpdateNotificationMutation } from "@/mutations";
import { toast } from "sonner";
import {  useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import type { updateNotifications, createNotifications } from "@/types/notifications";
export default function AddNotificationsDialog({
  dialogController,
  editAbleNotifications
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleNotifications?: updateNotifications
  }) {
  console.log("add-edit-notifications", editAbleNotifications);
  const [open, setOpen] = dialogController;
  const [formState, setFormState] = useState<updateNotifications>({
    id: editAbleNotifications?.id || 0,
    name: editAbleNotifications?.name || "",
    channel: editAbleNotifications?.channel || "",
    subject: editAbleNotifications?.subject || "",
    body: editAbleNotifications?.body || "",
    status: editAbleNotifications?.status || "inactive",
  });
  // useEffect(() => {
  //   if (editAbleNotifications) {
  //     console.log("editAbleNotifications", editAbleNotifications);
  //     setFormState({
  //       id: editAbleNotifications.id,
  //       name: editAbleNotifications.name,
  //       channel: editAbleNotifications.channel,
  //       subject: editAbleNotifications.subject,
  //       body: editAbleNotifications.body,
  //       status: editAbleNotifications.status,
  //     });
  //   }
  // }, [editAbleNotifications]);
  const { mutateAsync: createNotifications, isPending: isCreating } = useCreateNotificationMutation()
  const { mutateAsync: updateNotifications, isPending: isUpdating } = useUpdateNotificationMutation()
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof createNotifications]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleNotifications
        ? updateNotifications({ id: editAbleNotifications.id, name: formState.name , channel: formState.channel, subject:formState.subject, body:formState.body, status:formState.status}, {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Notifications:", error);
            },
          })
        :
      createNotifications({...formState } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating Notifications:", error);
        },
      }),
      {
        loading: editAbleNotifications?"Updating Notifications...":"Creating Notifications...",
        success: editAbleNotifications?"Notifications updated successfully!":"Notifications created successfully!",
        error: editAbleNotifications?"Error updating Notifications.":"Error creating Notifications.",
      }
    );
  };
  const [errors, setErrors] = useState<Partial<Record<keyof createNotifications, string>>>({});

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
        className="fixed top-10 left-1/2 transform -translate-x-1/2 
               bg-white rounded-xl p-6 max-w-md w-full z-50 
               max-h-[calc(100vh-5rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Add Notifications</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
           <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>
                <Switch
                    className="cursor-pointer"
                    checked={formState.status === "active"}
                    onCheckedChange={(checked) =>
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
              placeholder="Type Name here"
              className="w-full"
              required
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="channel" className="block mb-2 font-medium">Channel</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="channel"
              name="channel"
              type="text"
              className="w-full"
              required
              value={formState.channel}
              onChange={(e) => setFormState({ ...formState, channel: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="subject" className="block mb-2 font-medium">Subject</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="subject"
              name="subject"
              type="text"
              className="w-full"
              required
              value={formState.subject}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="body" className="block mb-2 font-medium">Body</Label>              
            </div>
            <Textarea
                id="body"
                name="body"
                placeholder="Type Notification Body here"
                className="min-h-[200px]"
                value={formState.body}
                onChange={handleInputChange}
              />            
          </div>          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleNotifications ? "Update" : "Create"}
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
