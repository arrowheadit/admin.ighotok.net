import { useMemo } from "react";
import { useCasteQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import AddCasteDialog from "@/components/dialogs/add-caste-dialog";
import ConfirmDeleteDialog from "@/components/dialogs/pop-confirm-dialog";
import { useDeleteCasteMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"

export default function CasteTable({
  populateCasteReligionOptionList,
}: {
  populateCasteReligionOptionList: (religionList: { value: number; label: string }[]) => void;
    }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: castes } = useCasteQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = castes?.data?.data?.last_page ?? 1;
    console.log('Total Pages:', totalPages, 'Page Size:', page,[...Array(totalPages)]);
    const { mutateAsync: deleteCaste, isPending } = useDeleteCasteMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        caste?: { id: number; name: string, religion_id: number };
    }>({ open: false });

    const casteList = castes?.data?.data?.data ?? [];
    
    const casteReligionOptionList = useMemo(() => {
    return castes?.data?.religions ?? [];
    }, [castes?.data?.religions]);
    
    console.log('Castes table');
    useEffect(() => {
        if (casteReligionOptionList.length > 0) {
            populateCasteReligionOptionList(casteReligionOptionList);
        }
    }, [casteReligionOptionList, populateCasteReligionOptionList]);
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
                    <TableHead className="border-r">Religion</TableHead>
                    <TableHead className="border-r">Caste</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {casteList.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center border-r">
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                        <Archive className="text-blue-400" size={72}/>
                                        <p className="text-gray-500 text-lg">No castes Found</p>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ): 
                        casteList.map((caste: { id: number, religion: { name: string }, name: string ,religion_id: number}) => (
                            <TableRow key={caste.id}>
                                <TableCell className="border-r border-b">{caste.religion?.name}</TableCell>
                                <TableCell className="border-r border-b">{caste.name}</TableCell>
                                
                                <TableCell className="border-b">
                                    <div className="flex items-center ">
                                        <Button 
                                            variant="default" 
                                            size="sm" 
                                            onClick={() => setDialogState({ open: true, caste })}
                                        >
                                            <PencilLine />
                                        </Button>
                                        <ConfirmDeleteDialog
                                            title="Are you sure?"
                                            description="You want to delete this Caste?"
                                            triggerButton={
                                                <Button variant="destructive" size="sm" className="ml-2">
                                                    <Trash2 />
                                                </Button>
                                            }
                                            confirmButton={
                                                <Button 
                                                    variant="destructive"
                                                    onClick={() => {
                                                        toast.promise(
                                                            deleteCaste(caste.id),
                                                            {
                                                                loading: "Deleting Caste...",
                                                                success: "Caste deleted successfully!",
                                                                error: "Error deleting Caste.",
                                                            }
                                                        )
                                                    }}
                                                    disabled={isPending}
                                                >
                                                    {isPending && <Loader2 className="animate-spin"/>}
                                                    {isPending ? "Loading..." : "Delete"}
                                                </Button>
                                            }
                                        />
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
                <AddCasteDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, caste: undefined })]}
                    editAbleCaste={dialogState.caste}
                    religionOptions={casteReligionOptionList}
                />
            )}
        </Fragment>
    );
}
