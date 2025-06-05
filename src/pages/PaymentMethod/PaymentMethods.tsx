import PaymentMethodTable from "@/components/tables/payment-method-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
export function PaymentMethods() {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
         <Button variant="default" asChild>
          <a href="/payment-methods/create">
            <PlusIcon />
            Create Manual Payment Method
          </a>
        </Button>        
      </div>
        <PaymentMethodTable />      
    </section>
  )
}
