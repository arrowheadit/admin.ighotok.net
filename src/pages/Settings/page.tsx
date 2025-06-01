import AddPageDialog from "@/components/dialogs/add-page-dialog";
import PageTable from "@/components/tables/page-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

<<<<<<< HEAD

=======
>>>>>>> 8a3fd8b7b18b81dc57cd0b6b6d0cd47bc0580d98
export function Page() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Page</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Page
        </Button> 
         {open && ( 
          <AddPageDialog dialogController={[open, setOpen]} />
        )}
      </div>
      <PageTable />
    </section>
  )
}
