
import { useReligionQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2, Search } from "lucide-react";
import { Fragment, useState } from "react";
import AddReligionDialog from "../dialogs/add-religion-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteReligionMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function ReligionsTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: religions } = useReligionQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = religions?.data?.last_page ?? 1;
    console.log('Total Pages:', totalPages, 'Page Size:', page,[...Array(totalPages)]);
    const { mutateAsync: deleteReligion, isPending } = useDeleteReligionMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        religion?: { id: number; name: string;};
    }>({ open: false });

    const religionList = religions?.data?.data ?? [];
    console.log('religious table');
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
                        <TableHead colSpan={2} className="border-r">Name</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {religionList.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center border-r">
                                {isPending ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                        <Archive className="text-blue-400" size={72}/>
                                        <p className="text-gray-500 text-lg">No Religions Found</p>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ): 
                        religionList.map((religion: { id: number, name: string }) => (
                            <TableRow key={religion.id}>
                                <TableCell colSpan={2} className="border-r border-b">{religion.name}</TableCell>
                                
                                <TableCell className="border-b">
                                    <div className="flex items-center ">
                                        <Button 
                                            variant="default" 
                                            size="sm" 
                                            onClick={() => setDialogState({ open: true, religion })}
                                        >
                                            <PencilLine />
                                        </Button>
                                        <ConfirmDeleteDialog
                                            title="Are you sure?"
                                            description="You want to delete this Religion?"
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
                                                            deleteReligion(religion.id),
                                                            {
                                                                loading: "Deleting Religion...",
                                                                success: "Religion deleted successfully!",
                                                                error: "Error deleting Religion.",
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
                <AddReligionDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, religion: undefined })]}
                    editAbleReligion={dialogState.religion}
                />
            )}
            </Fragment>
    );
}
