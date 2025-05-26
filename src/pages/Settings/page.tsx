import AddPageDialog from "@/components/dialogs/add-area-dialog";
import PageTable from "@/components/tables/page-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { UpazilaOptions } from "@/types/geo-location";

export function Page() {
  const [open, setOpen] = useState(false);
  const [upazilaOptionList,setUpazilaOptionList] = useState<UpazilaOptions[]>([])
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Page</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Page
        </Button> 
         {open && ( 
          <AddPageDialog dialogController={[open, setOpen]}
            upazilaOptions={ upazilaOptionList}  />
        )}
      </div>
      <PageTable />
    </section>
  )
}
