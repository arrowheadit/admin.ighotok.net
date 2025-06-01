import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateFaqsMutation, useUpdateFaqsMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
export interface CreateFaqFormValues{
    question: string,
    answer: string,
    status:"active" | "inactive",
}
export default function AddFaqsDialog({
  dialogController,
  editAbleFaqs
}: {
  dialogController: [boolean, (open: boolean) => void]
  editAbleFaqs?: {
    id: number;
    question: string; 
    answer: string; 
    status: "active" | "inactive"; 
  }
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({ 
    question: editAbleFaqs?.question || "",
    answer: editAbleFaqs?.answer || "",
    status: editAbleFaqs?.status === "active",
  });

  const { mutateAsync: createFaqs, isPending: isCreating } = useCreateFaqsMutation()
  const { mutateAsync: updateFaqs, isPending: isUpdating } = useUpdateFaqsMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleFaqs
        ? updateFaqs({ id: editAbleFaqs.id, question: formState.question , answer: formState.answer, status:formState.status}, {
            onSuccess: () => {
              setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating Faqs:", error);
            },
          })
        :
      createFaqs({...formState } , {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating Faqs:", error);
        },
      }),
      {
        loading: editAbleFaqs?"Updating Faqs...":"Creating Faqs...",
        success: editAbleFaqs?"Faqs updated successfully!":"Faqs created successfully!",
        error: editAbleFaqs?"Error updating Faqs.":"Error creating Faqs.",
      }
    );
  };
  const [errors, setErrors] = useState<Partial<Record<keyof CreateFaqFormValues, string>>>({});
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name as keyof CreateFaqFormValues]) {
      setErrors({
        ...errors,
        [name as keyof CreateFaqFormValues]: undefined,
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)}/>
      <div
<<<<<<< HEAD
        className="fixed top-10 left-1/2 transform -translate-x-1/2 
               bg-white rounded-xl p-6 max-w-md w-full z-50 
               max-h-[calc(100vh-5rem)] overflow-y-auto"
=======
        className="fixed bg-white rounded-xl p-6 max-w-md w-full mx-auto top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-xl font-semibold">Add Faqs</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
           <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <Label htmlFor="name" className="block mb-2 font-medium">Question</Label>
                <Switch
                    className="cursor-pointer"
                    checked={formState.status} 
                    onCheckedChange={(checked: boolean) => setFormState({ ...formState, status: checked })} 
                    disabled={isCreating || isUpdating} 
                />
            </div>
             <Input
              disabled={isCreating || isUpdating}
              id="question"
              name="question"
              type="text"
              placeholder="Type your question here"
              className="w-full"
              required
              value={formState.question}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Answer</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="answer"
              name="answer"
              type="text"
              className="w-full"
              required
              value={formState.answer}
              onChange={(e) => setFormState({ ...formState, answer: e.target.value })}
            />
          </div> */}

          <div className="space-y-2">
              <Label htmlFor="description">Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                placeholder="Type your answer here"
                className="min-h-[200px]"
                value={formState.answer}
                onChange={handleInputChange}
              />
              {errors.answer && <p className="text-sm text-red-500">{errors.answer}</p>}
            </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating && <LoaderCircle className="animate-spin"/>}
              {editAbleFaqs ? "Update" : "Create"}
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
