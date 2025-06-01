import AddTestimonialsDialog from "@/components/dialogs/add-testimonial-dialog";
import TestimonialsTable from "@/components/tables/testimonials-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Testimonials
  () {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Testimonial
        </Button> 
         {open && ( 
          <AddTestimonialsDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <TestimonialsTable />
    </section>
  )
}
