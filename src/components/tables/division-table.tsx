
import { useCallback } from "react";
import { useDivisionQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search} from "lucide-react";
import { Fragment, useState } from "react";
import AddDivisionDialog from "../dialogs/add-division-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteDivisionMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { DivisionItem } from "@/types/geo-location";

export default function DivisionTable() {
    // Removed duplicate declaration of upazilaOptionList
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 5; 
    const sort_by = "id";
    const sort_type = "desc";
    // useEffect(() => { 

    // }, []);
     // This should be replaced with the actual total pages from your API response
    const { data: divisions } = useDivisionQuery({ page, page_size, sort_by, sort_type ,search});
    console.log('Divisions..', divisions);
    const totalPages = divisions?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteDivision, isPending } = useDeleteDivisionMutation(); 
    const [deleteTarget, setDeleteTarget] = useState<DivisionItem | null>(null);  
        const [loadingId,setLoadingId] = useState<number | null>(null);
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        divisionData?: DivisionItem;
    }>({ open: false });

    const divisionList = divisions?.data?.data?.data ?? [];
   
     const handleDelete = useCallback(async () => {
        if (!deleteTarget) return;
        setLoadingId(deleteTarget.id);
        try {
            await toast.promise(deleteDivision(deleteTarget.id), {
                loading: "DeActivating Upazila...",
                success: "Upazila DeActivated successfully!",
                error: "Error DeActivating Upazila.",
            });
            setDeleteTarget(null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingId(null);
        }
    }, [deleteTarget, deleteDivision]);
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
                        <TableHead className="border-r">Division Name</TableHead>
                        <TableHead className="border-r">Bangla Name</TableHead>
                        <TableHead className="border-r">Url</TableHead>
                        <TableHead className="border-r">Status</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {divisionList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Division Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            divisionList.slice().sort((a:DivisionItem,b:DivisionItem)=>Number(b.is_active)-Number(a.is_active)).map((division: DivisionItem) => (
                                <TableRow key={division.id}>
                                    <TableCell  className="border-r border-b">{division.name}</TableCell>
                                    <TableCell  className="border-r border-b">{division.bn_name}</TableCell>
                                    <TableCell className="border-r border-b">{division.url}</TableCell>
                                    <TableCell className="border-r border-b">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${!division.is_active ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {division.is_active ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                    </TableCell>

                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, divisionData:division })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="ml-2"
                                                onClick={()=>setDeleteTarget(division)}
                                            >    
                                                <Trash2 />
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
                    <AddDivisionDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, divisionData: undefined })]}
                        editAbleDivision={dialogState.divisionData}
                    />
            )}
            {deleteTarget && (
                <ConfirmDeleteDialog
                    open={!!deleteTarget}
                    onOpenChange={(isOpen) => {
                    if (!isOpen) setDeleteTarget(null);
                    }}
                    title="Are you sure?"
                    description={`You want to De-Activate "${deleteTarget.name}"`}
                    confirmButton={
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete()}
                        disabled={loadingId === deleteTarget.id}
                    >
                        {loadingId === deleteTarget.id && <Loader2 className="animate-spin mr-2" />}
                        {loadingId === deleteTarget.id ? "DeActivating..." : "DeActivate"}
                    </Button>
                    }
                />
            )}
        </Fragment>
    );
}
