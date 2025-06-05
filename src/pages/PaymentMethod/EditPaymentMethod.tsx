import { AddEditPaymentMethodForm } from "@/components/forms/add-edit-payment-method-form";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { updatePaymentMethod } from "@/types/payment-method";
export function EditPaymentMethod() {
  const location = useLocation();
  const selectedPaymentMethod:updatePaymentMethod = location.state;
  console.log('selectedPaymentMethod', selectedPaymentMethod);
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Update Payment Method</h1>
        <Button variant="default" asChild>
          <a href="/payment-methods/payment-method-list">
            <List />
            Payment Method List
          </a>
        </Button>
      </div>
      <AddEditPaymentMethodForm selectedPaymentMethod={selectedPaymentMethod} />
    </section>
  )
}
