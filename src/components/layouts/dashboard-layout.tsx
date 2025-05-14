// import { Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { MainSidebar } from "./MainSidebar"
import { Header } from "./header"

export function DashboardLayout() {
  return (
    <section className="h-screen w-full overflow-hidden bg-background">
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <MainSidebar />
            </div>
            <div className="col-span-10 flex flex-col">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    </section>
  )
}
