import { useReligionQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import AddReligionDialog from "../dialogs/add-religion-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteReligionMutation } from "@/mutations";
import { toast } from "sonner";

export default function ReligionsTable() {
    const { data: religions } = useReligionQuery();
    const { mutateAsync: deleteReligion, isPending } = useDeleteReligionMutation();
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        religion?: { id: number; name: string;};
    }>({ open: false });

    const religionList = religions?.data?.data ?? [];
    console.log('religious table');
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="border-r">Name</TableHead>
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
                            <TableCell className="border-r border-b">{religion.name}</TableCell>
                            
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
                {dialogState.open && (
                    <AddReligionDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, religion: undefined })]}
                        editAbleReligion={dialogState.religion}
                    />
                )}
            </TableBody>
        </Table>
    );
}
