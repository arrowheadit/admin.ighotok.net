import { Outlet } from "react-router-dom"
import { MainSidebar } from "./MainSidebar"
import { Header } from "./Header"

export function DashboardLayout() {
  return (
    <section className="bg-background min-h-screen">
        <div className="grid grid-cols-12">
            <div className="col-span-3">
                <MainSidebar />
            </div>
            <div className="col-span-9">
                <div className="sticky top-0 w-full z-10">
                    <Header />
                </div>
                <main className="overflow-y-auto p-6 mt-4">
                    <Outlet />
                </main>
            </div>
        </div>
    </section>
  )
}
