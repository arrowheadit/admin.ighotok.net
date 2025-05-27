
import { useCallback } from "react";
import { usePageQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search,Component} from "lucide-react";
import { Fragment, useState } from "react";
 import AddPageDialog from "../dialogs/add-page-dialog";
 import EditPageSectionDialog from "../dialogs/edit-page-section-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeletePageMutation,useActiveDeActivePageMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { PageItem } from "@/types/pages";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PageTable() {
    // Removed duplicate declaration of upazilaOptionList
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
    // useEffect(() => { 

    // }, []);
     // This should be replaced with the actual total pages from your API response
    const { data: pages,isPending } = usePageQuery({ page, page_size, sort_by, sort_type ,search});
    console.log('Pages..', pages);
    const totalPages = pages?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deletePage} = useDeletePageMutation(); 
    const { mutateAsync: actDeactivatePage } = useActiveDeActivePageMutation(); 
    const [deleteTarget, setDeleteTarget] = useState<PageItem | null>(null);
    const [actDeactivateTarget, setActDeactivateTarget] = useState<PageItem | null>(null);
        const [loadingId,setLoadingId] = useState<number | null>(null);
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        pageData?: PageItem;
        isSectionOpen?: boolean;
    }>({ open: false ,isSectionOpen:false});

    const pageList = pages?.data?.data?.data ?? [];
   
     const handleDelete = useCallback(async () => {
        if (!deleteTarget) return;
        setLoadingId(deleteTarget.id);
        try {
            await toast.promise(deletePage(deleteTarget.slug), {
                loading: "Deleting Page...",
                success: "Page Deleted successfully!",
                error: "Error Deleting Page.",
            });
            setDeleteTarget(null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingId(null);
        }
     }, [deleteTarget, deletePage]);
    const handleActDeactivateTarget = useCallback(() => {
         const run = async () => {
            if (!actDeactivateTarget) return;
            setLoadingId(actDeactivateTarget.id);
            try {
                await toast.promise(
                    actDeactivatePage(actDeactivateTarget.slug),
                    {
                        loading: `${actDeactivateTarget.status === "active" ? "Deactivating Page..." : "Activating Page..."}`,
                        success: "Page status updated successfully!",
                        error: "Error updating page status.",
                    }
                );
                setActDeactivateTarget(null);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingId(null);
            }
        };

        if (actDeactivateTarget) {
            run();
        }
    },[actDeactivateTarget,actDeactivatePage])
    return (
        <Fragment>
                <div className="hidden flex-1 lg:flex ms-2">
                    <form className="w-full max-w-sm">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            value={search}
                            placeholder="Search..."
                            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                    </div>
                    </form>
                </div>
               <Table>
                    <TableHeader>
                         <TableRow>                       
                        <TableHead className="border-r">Title</TableHead>
                        <TableHead className="border-r">Status</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Page Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            pageList.slice().sort((a:PageItem,b:PageItem)=>Number(b.status)-Number(a.status)).map((page: PageItem) => (
                                <TableRow key={page.id}>
                                    <TableCell  className="border-r border-b">{page.title}</TableCell>
                                   
                                    <TableCell className="border-r border-b">
                                        <Switch
                                            className="cursor-pointer"
                                            checked={page.status=="active"?true:false} 
                                            onCheckedChange={(checked: boolean) => setActDeactivateTarget({ ...page, status: checked?"active":"inactive" })} 
                                            disabled={loadingId === deleteTarget?.id}
                                        />
                                    {/* <span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${page.status==="inactive" ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {page.status.toUpperCase()}
                                    </span> */}
                                    </TableCell>
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                             <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, pageData:page })}
                                            >
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <PencilLine />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Edit Page
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Button>
                                            <Button
                                            className="ml-2 bg-amber-500"    
                                               variant="default"
                                                size="sm" 
                                                onClick={() => setDialogState({ open: false, pageData:page,isSectionOpen:true })}
                                            >
                                               
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Component fill="#FFA500" color="#FFF" />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Edit Section
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                
                                            </Button>
                                           
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="ml-2"
                                                onClick={()=>setDeleteTarget(page)}
                                            >    
                                                
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Trash2 />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Delete Page
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }                        
                    </TableBody>
                </Table>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => { setPage(newPage) }}
                    maxButtons={5}
            /> 
            {dialogState.open && (
                <AddPageDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, pageData: undefined })]}
                    editAblePage={dialogState.pageData}
                />
            )} 
            {dialogState.isSectionOpen && (
                <EditPageSectionDialog
                    dialogController={[dialogState.isSectionOpen, (isSectionOpen) => setDialogState({ open:false, pageData: undefined,isSectionOpen:isSectionOpen })]}
                    editAblePage={dialogState.pageData}
                />
            )} 
             {deleteTarget && (
                <ConfirmDeleteDialog
                    open={!!deleteTarget}
                    onOpenChange={(isOpen) => {
                    if (!isOpen) setDeleteTarget(null);
                    }}
                    title="Are you sure?"
                    description={`You want to Delete "${deleteTarget.title}"`}
                    confirmButton={
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete()}
                        disabled={loadingId === deleteTarget.id}
                    >
                        {loadingId === deleteTarget.id && <Loader2 className="animate-spin mr-2" />}
                        {loadingId === deleteTarget.id ? "Deleting..." : "Delete"}
                    </Button>
                    }
                />
            )}
             {actDeactivateTarget && (
                <ConfirmDeleteDialog
                    open={!!actDeactivateTarget}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) setActDeactivateTarget(null);
                    }}
                    title="Are you sure?"
                    description={`You want to ${
                        actDeactivateTarget.status === "inactive" ? "Deactivate" : "Activate"
                    } "${actDeactivateTarget.title}"`}
                    confirmButton={
                        <Button
                            variant="destructive"
                            onClick={() => handleActDeactivateTarget()}
                            disabled={loadingId === actDeactivateTarget.id}
                        >
                            {loadingId === actDeactivateTarget.id && (
                                <Loader2 className="animate-spin mr-2" />
                            )}
                            {loadingId === actDeactivateTarget.id ? "Processing..." : `${
                        actDeactivateTarget.status == "inactive" ? "Deactivate" : "Activate"
                    }`}
                        </Button>
                    }
                />
            )}

        </Fragment>
    );
}
