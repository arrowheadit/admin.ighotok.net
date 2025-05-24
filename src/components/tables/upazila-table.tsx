
import { useMemo,useCallback } from "react";
import { useUpazilaQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search} from "lucide-react";
import { Fragment, useState } from "react";
import AddUpazilaDialog from "../dialogs/add-upazila-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteUpazilaMutation } from "@/mutations";
import { toast } from "sonner";
import { useEffect } from "react";
import { Input } from "@/components/ui/input"
import type { DistrictOptions,UpazilaItem } from "@/types/geo-location";

export default function UpazilaTable({ populateDistrictOptions }: { populateDistrictOptions: (upazilaList: DistrictOptions[]) => void }) {
    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";

    const { data: upazilas } = useUpazilaQuery({ page, page_size, sort_by, sort_type ,search});
    console.log('Upazilas..', upazilas);
    const totalPages = upazilas?.data?.last_page ?? 1;    
    const { mutateAsync: deleteUpazila, isPending } = useDeleteUpazilaMutation(); 
    const [deleteTarget, setDeleteTarget] = useState<UpazilaItem | null>(null);
  
    const [loadingId,setLoadingId] = useState<number | null>(null);
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        upazilaData?: UpazilaItem;
    }>({ open: false });
   
    const upazilaList = upazilas?.data?.data ?? [];
    const districtOptionList = useMemo(() => {
        return upazilas?.districts ?? [];
    }, [upazilas?.districts]);
    useEffect(() => {
        if (districtOptionList.length > 0) {
            populateDistrictOptions(districtOptionList);
        }
    }, [districtOptionList, populateDistrictOptions]); 
    
      useEffect(() => { 
          console.log('delete target has been changed...', deleteTarget);
    }, [deleteTarget]);
    const handleDelete = useCallback(async () => {
        if (!deleteTarget) return;
        setLoadingId(deleteTarget.id);
        try {
            await toast.promise(deleteUpazila(deleteTarget.id), {
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
    }, [deleteTarget, deleteUpazila]);
    
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
                        <TableHead className="border-r">District</TableHead>
                        <TableHead className="border-r">Upazila Name</TableHead>
                        <TableHead className="border-r">Bangla Name</TableHead>
                        <TableHead className="border-r">Url</TableHead>
                        <TableHead className="border-r">Status</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {upazilaList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Education Subject Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                        upazilaList.slice().sort((a:UpazilaItem, b:UpazilaItem) => Number(b.is_active) - Number(a.is_active)) 
                            .map((upazila: UpazilaItem) => (
                                <TableRow key={upazila.id}>
                                    <TableCell  className="border-r border-b">{upazila.district.name}</TableCell>
                                    <TableCell  className="border-r border-b">{upazila.name}</TableCell>
                                    <TableCell  className="border-r border-b">{upazila.bn_name}</TableCell>
                                    <TableCell className="border-r border-b">{upazila.url}</TableCell>
                                   <TableCell className={`border-r border-b ${!upazila.is_active ? "text-red-500 font-bold" : "text-green-500 font-bold"}`}>
                                    {upazila.is_active ? "Active" : "InActive"}
                                    </TableCell>

                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, upazilaData:upazila })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="ml-2"
                                                onClick={()=>setDeleteTarget(upazila)}
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
                    <AddUpazilaDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, upazilaData: undefined })]}
                    editAbleUpazila={dialogState.upazilaData}
                    districtOptions={districtOptionList}
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
