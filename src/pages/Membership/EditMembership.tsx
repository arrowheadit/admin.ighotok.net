import { InsertMembershipForm } from "@/components/forms/insert-membership-form";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { updateMemberships } from "@/types/memberships";
export function EditMembership() {
  const location = useLocation();
  const selectedMemberData:updateMemberships = location.state;
  console.log('selectedMemberData', selectedMemberData);
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Update Membership</h1>
        <Button variant="default" asChild>
          <a href="/membership/memberships">
            <List />
            Membership List
          </a>
        </Button>
      </div>
      <InsertMembershipForm selectedMemberData={selectedMemberData} />
    </section>
  )
}
