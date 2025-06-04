import AddLifeStoryDialog from "@/components/dialogs/add-life-story-dialog";
import LifeStoryTable from "@/components/tables/life-story-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function LifeStory
  () {
  const [open, setOpen] = useState(false);
  console.log("Life Story",open);
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Life Story</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Life Story
        </Button> 
         {open && ( 
          <AddLifeStoryDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <LifeStoryTable />
    </section>
  )
}
