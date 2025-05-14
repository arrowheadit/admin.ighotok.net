import { useCategoriesQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import AddCategoryDialog from "../dialogs/add-category-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteBlogCategoryMutation } from "@/mutations";
import { toast } from "sonner";

export default function CategoriesTable() {
    const { data: categories } = useCategoriesQuery();
    const { mutateAsync: deleteCategory, isPending } = useDeleteBlogCategoryMutation();
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        category?: { id: number; name: string; status: "active" | "inactive" };
    }>({ open: false });

    const categoryList = categories?.data?.data?.data ?? [];

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
                {categoryList.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center border-r">
                            {isPending ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                    <Archive className="text-blue-400" size={72}/>
                                    <p className="text-gray-500 text-lg">No categories found</p>
                                </div>
                            )}
                        </TableCell>
                    </TableRow>
                ): 
                    categoryList.map((category: { id: number, name: string, status: "active" | "inactive" }) => (
                        <TableRow key={category.id}>
                            <TableCell className="border-r border-b">{category.name}</TableCell>
                            <TableCell className="border-r border-b">
                                <span className={`px-2 py-1 rounded-md text-xs font-medium ${category.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                    {category.status.toUpperCase()}
                                </span>
                            </TableCell>
                            <TableCell className="border-b">
                                <div className="flex items-center ">
                                    <Button 
                                        variant="default" 
                                        size="sm" 
                                        onClick={() => setDialogState({ open: true, category })}
                                    >
                                        <PencilLine />
                                    </Button>
                                    <ConfirmDeleteDialog
                                        title="Are you sure?"
                                        description="You want to delete this category?"
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
                                                        deleteCategory(category.id),
                                                        {
                                                            loading: "Deleting category...",
                                                            success: "Category deleted successfully!",
                                                            error: "Error deleting category.",
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
                {dialogState.open && (
                    <AddCategoryDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, category: undefined })]}
                        editAbleCategory={dialogState.category}
                    />
                )}
            </TableBody>
        </Table>
    );
}
