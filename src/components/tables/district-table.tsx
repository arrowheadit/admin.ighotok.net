
import { useMemo,useCallback,useEffect } from "react";
import { useDistrictsQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search} from "lucide-react";
import { Fragment, useState } from "react";
import AddDistrictDialog from "../dialogs/add-district-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteDistrictMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { DivisionOptions,DistrictItem } from "@/types/geo-location";

export default function DistrictTable({ populateDivisionOptions }: { populateDivisionOptions: (districtList: DivisionOptions[]) => void }) {
    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";

    const { data: districts } = useDistrictsQuery({ page, page_size, sort_by, sort_type ,search});
    console.log('Districts..', districts);
    const totalPages = districts?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteDistrict, isPending } = useDeleteDistrictMutation(); 
    const [deleteTarget, setDeleteTarget] = useState<DistrictItem | null>(null);  
    const [loadingId,setLoadingId] = useState<number | null>(null);
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        districtData?: DistrictItem;
    }>({ open: false });
   
    const districtList = districts?.data?.data?.data ?? [];
    const divisionOptionList = useMemo(() => {
        return districts?.data?.divisions ?? [];
    }, [districts?.data?.divisions]);
    useEffect(() => {
        if (divisionOptionList.length > 0) {
            populateDivisionOptions(divisionOptionList);
        }
    }, [divisionOptionList, populateDivisionOptions]); 
    
     
    const handleDelete = useCallback(async () => {
        if (!deleteTarget) return;
        setLoadingId(deleteTarget.id);
        try {
            await toast.promise(deleteDistrict(deleteTarget.id), {
                loading: "DeActivating District...",
                success: "District DeActivated successfully!",
                error: "Error DeActivating District.",
            });
            setDeleteTarget(null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingId(null);
        }
    }, [deleteTarget, deleteDistrict]);
    
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
                        <TableHead className="border-r">Division</TableHead>
                        <TableHead className="border-r">District</TableHead>
                        <TableHead className="border-r">Bangla Name</TableHead>
                        <TableHead className="border-r">Lat</TableHead>
                        <TableHead className="border-r">Lon</TableHead>
                        <TableHead className="border-r">Url</TableHead>
                        <TableHead className="border-r">Status</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {districtList.length === 0 ? (
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
                        districtList.slice().sort((a:DistrictItem, b:DistrictItem) => Number(b.is_active) - Number(a.is_active)) 
                            .map((district: DistrictItem) => (
                                <TableRow key={district.id}>
                                    <TableCell  className="border-r border-b">{district.division.name}</TableCell>
                                    <TableCell  className="border-r border-b">{district.name}</TableCell>
                                    <TableCell className="border-r border-b">{district.bn_name}</TableCell>
                                    <TableCell className="border-r border-b">{district.lat}</TableCell>
                                    <TableCell  className="border-r border-b">{district.lon}</TableCell>
                                    <TableCell className="border-r border-b">{district.url}</TableCell>
                                <TableCell className="border-r border-b">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${!district.is_active ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {district.is_active ? "ACTIVE" : "INACTIVE"}
                                    </span>
                                </TableCell>

                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, districtData:district })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="ml-2"
                                                onClick={()=>setDeleteTarget(district)}
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
                    <AddDistrictDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, districtData: undefined })]}
                    editAbleDistrict={dialogState.districtData}
                    divisionOptions={divisionOptionList}
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
