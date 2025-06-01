import AddOurTeamsDialog from "@/components/dialogs/add-our-team-dialog";
import OurTeamsTable from "@/components/tables/our-teams-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function OurTeams
  () {
  const [open, setOpen] = useState(false);
  console.log("Our Teams",open);
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Our Teams</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Team Member
        </Button> 
         {open && ( 
          <AddOurTeamsDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <OurTeamsTable />
    </section>
  )
}
