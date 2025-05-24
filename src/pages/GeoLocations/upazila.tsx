import AddUpazilaDialog from "@/components/dialogs/add-upazila-dialog";
import UpazilaTable from "@/components/tables/upazila-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { DistrictOptions } from "@/types/geo-location";

export function Upazila() {
  const [open, setOpen] = useState(false);
  const [districtOptionList, setDistrictOptionList] = useState<DistrictOptions[]>([])
  console.log('district options in upazila page..',districtOptionList)
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upazila</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Upazila
        </Button> 
         {open && ( 
          <AddUpazilaDialog dialogController={[open, setOpen]}
            districtOptions={ districtOptionList}  />
        )}
      </div>
      <UpazilaTable populateDistrictOptions={setDistrictOptionList} />
    </section>
  )
}
