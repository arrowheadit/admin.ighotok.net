import AddDistrictDialog from "@/components/dialogs/add-district-dialog";
import DistrictTable from "@/components/tables/district-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { DivisionOptions } from "@/types/geo-location";

export function District() {
  const [open, setOpen] = useState(false);
  const [divisionOptionList, setDivisionOptionList] = useState<DivisionOptions[]>([])
  console.log('district options in district page..',divisionOptionList)
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">District</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New District
        </Button> 
         {open && ( 
          <AddDistrictDialog dialogController={[open, setOpen]}
            divisionOptions={ divisionOptionList}  />
        )}
      </div>
      <DistrictTable populateDivisionOptions={setDivisionOptionList} />
    </section>
  )
}
