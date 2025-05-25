import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useCreateDistrictMutation,useUpdateDistrictMutation } from "@/mutations";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import type { DistrictItem, DivisionOptions } from "@/types/geo-location";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function AddDistrictDialog({
  dialogController,
  editAbleDistrict,
  divisionOptions 
}: {
  dialogController: [boolean, (open: boolean) => void]
  divisionOptions: DivisionOptions[]
  editAbleDistrict?: DistrictItem
}) {
  const [open, setOpen] = dialogController;
  const [ formState, setFormState ] = useState({
    name: editAbleDistrict?.name || "",
    division_id: editAbleDistrict?.division_id || "",
    bn_name: editAbleDistrict?.bn_name || "",
    lat: editAbleDistrict?.lat || "",
    lon: editAbleDistrict?.lon || "",
    url: editAbleDistrict?.url || "",
    is_active:editAbleDistrict?.is_active || false,
  });

  const { mutateAsync: createDistrict, isPending: isCreating } = useCreateDistrictMutation()
  const { mutateAsync: updateDistrict, isPending: isUpdating } = useUpdateDistrictMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      editAbleDistrict
        ? updateDistrict(
          {
            id: editAbleDistrict.id,
            name: formState.name,
            bn_name: formState.bn_name,
            lat: formState.lat,
            lon: formState.lon,
            division_id: Number(formState.division_id),
            url: formState.url,
            is_active: Boolean(formState.is_active),            
          }, {
            onSuccess: () => {
            setOpen(false);
            },
            onError: (error) => {
              console.error("Error updating District:", error);
            },
          })
        :
        createDistrict({
            name: formState.name,
          bn_name: formState.bn_name,
            lat: formState.lat,
            lon: formState.lon,
            division_id: Number(formState.division_id),
            url: formState.url,
            is_active: Boolean(formState.is_active), 
        }, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          console.error("Error creating upazila:", error);
        },
      }),
      {
        loading: editAbleDistrict
        ? "Updating District..."
        : "Creating District...",
        success: editAbleDistrict
        ? "District updated successfully!"
        : "District created successfully!",
        error: editAbleDistrict
        ? "Error updating District"
        : "Error creating District",
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
        <DialogTitle className="text-xl font-semibold">Add District</DialogTitle>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Name</Label>              
            </div>
            <Select
              disabled={isCreating || isUpdating}
              defaultValue={editAbleDistrict?.division_id.toString()}
              onValueChange={(value) => setFormState({ ...formState, division_id: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
            <SelectContent>
              {divisionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
            
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">District</Label>              
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
              <Label htmlFor="name" className="block mb-2 font-medium">Lat</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="lat"
              name="lat"
              type="text"
              className="w-full"
              required
              value={formState.lat}
              onChange={(e) => setFormState({ ...formState, lat: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="name" className="block mb-2 font-medium">Lon</Label>              
            </div>
            <Input
              disabled={isCreating || isUpdating}
              id="lon"
              name="lon"
              type="text"
              className="w-full"
              required
              value={formState.lon}
              onChange={(e) => setFormState({ ...formState, lon: e.target.value })}
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
              {editAbleDistrict ? "Update" : "Create"}
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
