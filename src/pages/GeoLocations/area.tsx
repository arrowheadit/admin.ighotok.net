import AddAreaDialog from "@/components/dialogs/add-area-dialog";
import AreaTable from "@/components/tables/area-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { UpazilaOptions } from "@/types/geo-location";

export function Area() {
  const [open, setOpen] = useState(false);
  const [upazilaOptionList,setUpazilaOptionList] = useState<UpazilaOptions[]>([])
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Area</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Area
        </Button> 
         {open && ( 
          <AddAreaDialog dialogController={[open, setOpen]}
            upazilaOptions={ upazilaOptionList}  />
        )}
      </div>
      <AreaTable populateUpazilaOptions={setUpazilaOptionList} />
    </section>
  )
}
