import AddEducationSubjectDialog from "@/components/dialogs/add-education-subject-dialog";
import EducationSubjectTable from "@/components/tables/education-subject-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
type educationOption = {
  value: number; 
  label: string;
};

export function EducationSubjects() {
  const [open, setOpen] = useState(false);
  const [educationOptionList, setEducationOptionList] = useState<educationOption[]>([]);

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Education Subject/Major</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Major
        </Button> 
         {open && ( 
          <AddEducationSubjectDialog dialogController={[open, setOpen]}
          educationOptions={educationOptionList}/>
        )}
      </div>
      <EducationSubjectTable populateEducationOptions={setEducationOptionList} />
    </section>
  )
}
