import MembershipTable from "@/components/tables/memberships-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
export function Memberships() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Memberships</h1>
         <Button variant="default" asChild>
          <a href="/membership/create">
            <PlusIcon />
            New membership
          </a>
        </Button>        
      </div>
        <MembershipTable />      
    </section>
  )
}
