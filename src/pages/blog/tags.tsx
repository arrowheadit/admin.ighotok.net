import AddTagDialog from "@/components/dialogs/add-tag-dialog";
import TagsTable from "@/components/tables/tags-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Tags() {
  const [open, setOpen] = useState(false);
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tags</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          New Tag
        </Button>
        {open && ( 
          <AddTagDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <TagsTable />
    </section>
  )
}
