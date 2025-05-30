import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, X, ChevronDown, Bookmark, Loader2, BookOpenText,BriefcaseBusiness,MapPinned,ShieldQuestion,GraduationCap,Settings } from "lucide-react";

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
              <Collapsible className="px-4" defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center justify-between w-full text-sm font-medium text-left py-2">
                    <div className="flex items-center gap-2">
                       <MapPinned />
                      <span className="font-medium">Geo Location</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="geo-locations/division" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("geo-locations/division") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Division
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>                    
                  </SidebarMenu>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="geo-locations/district" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("geo-locations/district") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          District
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>                    
                  </SidebarMenu>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="geo-locations/upazila" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("geo-locations/upazila") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Upazila
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>                    
                  </SidebarMenu>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="geo-locations/area" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("geo-locations/area") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Area
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>                    
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="px-4" defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center justify-between w-full text-sm font-medium text-left py-2">
                    <div className="flex items-center gap-2">
                      <BookOpenText />
                      <span className="font-medium">Religion</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="religion/religions" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("religion/religions") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Religion
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>                       
                         <Link to="religion/castes" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("religion/castes") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Caste
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="px-4" defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center justify-between w-full text-sm font-medium text-left py-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={32} absoluteStrokeWidth />
                      <span className="font-medium">Education</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="education/educations" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("education/educations") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Education
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="education/education-subjects" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("education/education-subjects") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Education Subject
                        </Link>                        
                      </SidebarMenuButton>
                    </SidebarMenuItem>  
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible> 
               <SidebarMenu className="">
                <SidebarMenuItem>
                  <SidebarMenuButton >
                <Link to="profession" className={`flex items-center justify-start gap-2 w-full text-sm font-medium text-left  px-4 hover:bg-gray-100 ${isActive("profession") ? "bg-gray-100 " : ""} `}>
                    <BriefcaseBusiness size={16}  />
                    Profession
                  </Link>                        
                  </SidebarMenuButton>
                </SidebarMenuItem>                    
              </SidebarMenu>
              <SidebarMenu className="">
                <SidebarMenuItem>
                  <SidebarMenuButton >
                <Link to="faqs" className={`flex items-center justify-start gap-2 w-full text-sm font-medium text-left  px-4 hover:bg-gray-100 ${isActive("faqs") ? "bg-gray-100 " : ""} `}>
                    <ShieldQuestion size={16} />
                    Faqs
                  </Link>                        
                  </SidebarMenuButton>
                </SidebarMenuItem>                    
              </SidebarMenu>
              <Collapsible className="px-4" defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant={"ghost"} className="flex items-center justify-between w-full text-sm font-medium text-left py-2">
                    <div className="flex items-center gap-2">
                      <Settings size={32} absoluteStrokeWidth/>
                      <span className="font-medium">Settings</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-6 space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="settings/pages" className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-100 ${isActive("settings/Pages") ? "bg-gray-100 " : ""} !w-[85%]`}>
                          Pages
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
