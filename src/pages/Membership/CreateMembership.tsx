import { InsertMembershipForm } from "@/components/forms/insert-membership-form";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

export function CreateMembership() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Membership</h1>
        <Button variant="default" asChild>
          <a href="/membership/memberships">
            <List />
            Membership List
          </a>
        </Button>
      </div>
      <InsertMembershipForm/>
    </section>
  )
}
