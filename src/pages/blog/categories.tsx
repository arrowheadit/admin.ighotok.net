import AddCategoryDialog from "@/components/dialogs/add-category-dialog";
import CategoriesTable from "@/components/tables/categories-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Categories() {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          New Category
        </Button>
        {open && ( 
          <AddCategoryDialog dialogController={[open, setOpen]}/>
        )}
      </div>
      <CategoriesTable />
    </section>
  )
}
