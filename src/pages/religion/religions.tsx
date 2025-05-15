import AddReligionDialog from "@/components/dialogs/add-religion-dialog";
import ReligionsTable from "@/components/tables/religion-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Religions() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Religion</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Religion
        </Button> 
         {open && ( 
          <AddReligionDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <ReligionsTable />
    </section>
  )
}
