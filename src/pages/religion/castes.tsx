import AddCasteDialog from "@/components/dialogs/add-caste-dialog";
import CasteTable from "@/components/tables/caste-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Castes() {
  const [open, setOpen] = useState(false);
  const [casteReligionOptionList, setCasteReligionOptionList] = useState([]);
  const [religionOptions, setReligionOptions] = useState([
    { id: 1, name: "Hindu" },
    { id: 2, name: "Muslim" },
    { id: 3, name: "Christian" },
    { id: 4, name: "Sikh" },
    { id: 5, name: "Buddhist" },
    { id: 6, name: "Jain" },
    { id: 7, name: "Zoroastrian" },
  ]);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Castes</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Caste
        </Button>
        {open && (
          <AddCasteDialog dialogController={[open, setOpen]} religionOptions={casteReligionOptionList} />
        )}
      </div>
      {/* <CasteTable populateCasteReligionOptionList={(religionOps)=>setCasteReligionOptionList(religionOps)} /> */}
      <CasteTable/>
    </section>
  )
}
