import { Outlet } from "react-router-dom"
import { MainSidebar } from "./MainSidebar"
import { Header } from "./header"

export function DashboardLayout() {
  return (
    <section className="bg-background min-h-screen">
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <MainSidebar />
            </div>
            <div className="col-span-10">
                <div className="fixed w-[calc(100dvw-335px)] z-10">
                    <Header />
                </div>
                <main className="overflow-y-auto p-6 my-16">
                    <Outlet />
                </main>
            </div>
        </div>
    </section>
  )
}
