import AddDivisionDialog from "@/components/dialogs/add-division-dialog";
import DivisionTable from "@/components/tables/division-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Division() {
  const [open, setOpen] = useState(false);  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Division</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Division
        </Button> 
         {open && ( 
          <AddDivisionDialog dialogController={[open, setOpen]} />
        )}
      </div>
      <DivisionTable />
    </section>
  )
}
