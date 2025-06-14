import AddNotificationDialog from "@/components/dialogs/add-notification-dialog";
import NotificationTable from "@/components/tables/notification-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function Notification () {
  const [open, setOpen] = useState(false);
  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notification Template </h1>
        <Button variant="default" onClick={() => setOpen(true)}>
          <PlusIcon />
          Add New Notification Template
        </Button> 
         {open && ( 
          <AddNotificationDialog  dialogController={[open, setOpen]}/>
        )}
      </div>
      <NotificationTable/>
    </section>
  )
}
