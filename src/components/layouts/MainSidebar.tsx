import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, X, ChevronDown, Bookmark, Loader2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useAuth } from "@/context/hooks";

export function MainSidebar() {
  const { logout, isLoading } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <SidebarProvider>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsMobileOpen(true)} className="rounded-full">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Sidebar className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 pt-2 text-sm font-semibold text-gray-600">Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <Collapsible className="px-4" defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center justify-between w-full text-sm font-medium text-left py-2">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-5 w-5" />
                      <span className="font-medium">Blog</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/blog/posts" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("/blog/posts") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Posts
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/blog/category" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("/blog/category") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Category
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/blog/tag" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("/blog/tag") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Tag
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto p-4">
          <Separator className="my-4" />
          <Button disabled={isLoading} variant="outline" className="w-full justify-center gap-2 border border-destructive text-destructive" onClick={() => logout()}>
            {isLoading? "Logging out..." : "Logout"}
            {isLoading ? <Loader2 className="animate-spin" />  : <LogOut className="h-4 w-4" />}
          </Button>
        </div>
      </Sidebar>
    </SidebarProvider>
  );
}
