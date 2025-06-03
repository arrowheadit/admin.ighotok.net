import ContactTable from "@/components/tables/contact-table";
export function ContactList() {  
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact</h1>  
      </div>
      <ContactTable />
    </section>
  )
}
