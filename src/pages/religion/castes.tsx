import AddCasteDialog from "@/components/dialogs/add-caste-dialog";
import CasteTable from "@/components/tables/caste-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
type religionOption = {
  value: number;
  label: string;
};
export function Castes() {
  const [open, setOpen] = useState(false);
  const [casteReligionOptionList, setCasteReligionOptionList] = useState<religionOption[]>([]);  
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
      <CasteTable populateCasteReligionOptionList={setCasteReligionOptionList} />
      {/* <CasteTable/> */}
    </section>
  )
}
