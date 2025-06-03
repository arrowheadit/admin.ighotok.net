
import { useMembershipsQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2,Search } from "lucide-react";
import { Fragment, useState } from "react";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteMembershipMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { memberships, updateMemberships } from "@/types/memberships";
import { useNavigate } from "react-router-dom";
export default function MembershipsTable() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: Memberships } = useMembershipsQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = Memberships?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteMemberships, isPending } = useDeleteMembershipMutation();   

    const MembershipsList = Memberships?.data?.data?.data ?? [];
    const handleEditMembershipEvent = (selectedMember:updateMemberships) => {
        navigate(`/membership/edit/${selectedMember.slug}`,{state:selectedMember})
    }
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
                            <TableHead className="border-r">Proposals</TableHead>
                            <TableHead className="border-r">Price</TableHead>
                            <TableHead className="border-r">Days</TableHead>
                            <TableHead className="border-r">Is Published</TableHead>
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MembershipsList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Memberships Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            MembershipsList.map((membership: memberships) => (
                                <TableRow key={membership.id}>
                                    <TableCell className="border-r border-b">{membership.name}</TableCell>
                                    <TableCell className="border-r border-b"><img className="h-12" src={import.meta.env.VITE_API_SERVER_IMAGE_PATH+"Memberships/"+membership.image} alt="Membership-Image"></img></TableCell>  
                                    <TableCell className="border-r border-b">{membership.proposals}</TableCell>
                                    <TableCell className="border-r border-b">{membership.price}</TableCell>
                                    <TableCell className="border-r border-b">{membership.days}</TableCell>
                                    <TableCell className="border-r border-b"><span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${!membership.is_published ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {membership.is_published?"Yes" : "No"}
                                    </span></TableCell>
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => handleEditMembershipEvent(membership)}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Membership?"
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
                                                                deleteMemberships(membership.slug),
                                                                {
                                                                    loading: "Deleting Membership...",
                                                                    success: "Membership deleted successfully!",
                                                                    error: "Error deleting Membership.",
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
                  
            </Fragment>
    );
}
