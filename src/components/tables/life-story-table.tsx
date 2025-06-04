
import { useLifeStoriesQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2,Search } from "lucide-react";
import { Fragment, useState } from "react";
import AddLifeStoryDialog from "../dialogs/add-life-story-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteLifeStoryMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { lifeStory,updateLifeStory } from "@/types/lifeStory";
export default function LifeStoryTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: lifeStory } = useLifeStoriesQuery({ page, page_size, sort_by, sort_type, search }); 
    console.log('lifeStory Data fetched..', lifeStory);
    const totalPages = lifeStory?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteLifeStory, isPending } = useDeleteLifeStoryMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        lifeStory?: updateLifeStory;
    }>({ open: false });

    const lifeStoryList = lifeStory?.data?.data?.data ?? [];
    //console.log("lifeStoryList..", lifeStoryList);
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
                            <TableHead className="border-r">Description</TableHead>
                            <TableHead className="border-r">Status</TableHead>
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lifeStoryList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No LifeStory Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            lifeStoryList.map((lifeStory: lifeStory) => (
                                <TableRow key={lifeStory.id}>
                                    <TableCell className="border-r border-b">{lifeStory.name}</TableCell>
                                    <TableCell className="border-r border-b"><img className="h-12" src={import.meta.env.VITE_API_SERVER_IMAGE_PATH + "life_strory/" + lifeStory.image} alt="Life-Story-Image"></img></TableCell> 
                                    <TableCell className="border-r border-b">{lifeStory.description.length>70?`${lifeStory.description.slice(0,70)}...`:lifeStory.description}</TableCell>
                                    <TableCell className="border-r border-b"><span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${lifeStory.status==="inactive" ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {lifeStory.status=="active" ? "ACTIVE" : "INACTIVE"}
                                    </span></TableCell>
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, lifeStory:lifeStory })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Life Story?"
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
                                                                deleteLifeStory(lifeStory.id),
                                                                {
                                                                    loading: "Deleting Life Story...",
                                                                    success: "Life Story deleted successfully!",
                                                                    error: "Error deleting Life Story.",
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
                <AddLifeStoryDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, lifeStory: undefined })]}
                    editAbleLifeStory={dialogState.lifeStory}
                />
            )}
            </Fragment>
    );
}
