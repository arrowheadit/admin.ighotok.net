import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import AddTagDialog from "../dialogs/add-tag-dialog"; // Replace AddCategoryDialog with AddTagDialog
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { toast } from "sonner";
import { useDeleteBlogTagMutation } from "@/mutations";
import { useTagListQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function TagsTable() {
    const { data: tags } = useTagListQuery(); // Fetch tags instead of categories
    const { mutateAsync: deleteTag, isPending } = useDeleteBlogTagMutation(); // Replace deleteCategory with deleteTag
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        tag?: { id: number; name: string; status: "active" | "inactive" };
    }>({ open: false });

    const tagList = tags?.data?.data?.data ?? []; // Use tagList instead of categoryList
    
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="border-r">Name</TableHead>
                    <TableHead className="border-r">Status</TableHead>
                    <TableHead className="border-r">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tagList.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center border-r">
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <span className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                    <Archive className="text-blue-400" size={72} />
                                    <p className="text-gray-500 text-lg">No tags found</p>
                                </span>
                            )}
                        </TableCell>
                    </TableRow>
                ) : (
                    tagList.map((tag: { id: number; name: string; status: "active" | "inactive" }) => (
                        <TableRow key={tag.id}>
                            <TableCell className="border-r border-b">{tag.name}</TableCell>
                            <TableCell className="border-r border-b">
                                <span
                                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        tag.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {tag.status.toUpperCase()}
                                </span>
                            </TableCell>
                            <TableCell className="border-b">
                                <div className="flex items-center">
                                    <Button variant="default" size="sm" onClick={() => setDialogState({ open: true, tag })}>
                                        <PencilLine />
                                    </Button>
                                    <ConfirmDeleteDialog
                                        title="Are you sure?"
                                        description="You want to delete this tag?"
                                        triggerButton={
                                            <Button variant="destructive" size="sm" className="ml-2">
                                                <Trash2 />
                                            </Button>
                                        }
                                        confirmButton={
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    toast.promise(deleteTag(tag.id), {
                                                        loading: "Deleting tag...",
                                                        success: "Tag deleted successfully!",
                                                        error: "Error deleting tag.",
                                                    });
                                                }}
                                                disabled={isPending}
                                            >
                                                {isPending && <Loader2 className="animate-spin" />}
                                                {isPending ? "Loading..." : "Delete"}
                                            </Button>
                                        }
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
                {dialogState.open && (
                    <AddTagDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, tag: undefined })]}
                        editAbleTag={dialogState.tag} // Replace editAbleCategory with editAbleTag
                    />
                )}
            </TableBody>
        </Table>
    );
}
