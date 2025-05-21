import AddProfessionDialog from "@/components/dialogs/add-profession-dialog";
import ProfessionTable from "@/components/tables/profession-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Profession() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profession</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Profession
        </Button> 
         {open && ( 
          <AddProfessionDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <ProfessionTable />
    </section>
  )
}
