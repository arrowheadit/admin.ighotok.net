import AddEducationDialog from "@/components/dialogs/add-education-dialog";
import EducationTable from "@/components/tables/education-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Educations() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Education Subject/Major</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Major
        </Button> 
         {open && ( 
          <AddEducationDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <EducationTable />
    </section>
  )
}
