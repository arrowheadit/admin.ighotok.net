import AddFaqsDialog from "@/components/dialogs/add-faqs-dialog";
import FaqsTable from "@/components/tables/faqs-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Faqs() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faqs</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Faq
        </Button> 
         {open && ( 
          <AddFaqsDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <FaqsTable />
    </section>
  )
}
