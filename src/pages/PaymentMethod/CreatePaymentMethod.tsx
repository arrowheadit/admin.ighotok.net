import { AddEditPaymentMethodForm } from "@/components/forms/add-edit-payment-method-form";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";

export function CreatePaymentMethod() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Payment Method</h1>
        <Button variant="default" asChild>
          <a href="/settings/payment-methods">
            <List />
            Payment Method List
          </a>
        </Button>
      </div>
      <AddEditPaymentMethodForm/>
    </section>
  )
}
