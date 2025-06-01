
import { useOurTeamsQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2,Search } from "lucide-react";
import { Fragment, useState } from "react";
import AddOurTeamDialog from "../dialogs/add-our-team-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteOurTeamsMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { ourTeams,updateOurTeams } from "@/types/our-teams";
export default function OurTeamsTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: ourTeams } = useOurTeamsQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = ourTeams?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteMember, isPending } = useDeleteOurTeamsMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        ourTeams?: updateOurTeams;
    }>({ open: false });

    const ourTeamsList = ourTeams?.data?.data?.data ?? [];
    // console.log("image path..." + import.meta.env.VITE_API_SERVER_IMAGE_PATH);
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
                            <TableHead className="border-r">Name</TableHead>
                            <TableHead className="border-r">Image</TableHead>
                        
                            <TableHead className="border-r">Designation</TableHead>
                          
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ourTeamsList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No OurTeams Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            ourTeamsList.map((member: ourTeams) => (
                                <TableRow key={member.id}>
                                    <TableCell className="border-r border-b">{member.name}</TableCell>
                                    <TableCell className="border-r border-b"><img className="h-12" src={import.meta.env.VITE_API_SERVER_IMAGE_PATH+"teams/"+member.image} alt="Member-Image"></img></TableCell>  
                                   
                                    <TableCell className="border-r border-b">{member.designation}</TableCell>                                    
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, ourTeams:member })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Member?"
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
                                                                deleteMember(member.id),
                                                                {
                                                                    loading: "Deleting Member...",
                                                                    success: "Member deleted successfully!",
                                                                    error: "Error deleting Member.",
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
                <AddOurTeamDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, ourTeams: undefined })]}
                    editAbleOurTeam={dialogState.ourTeams}
                />
            )}
            </Fragment>
    );
}
