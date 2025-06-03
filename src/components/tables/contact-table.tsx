
import { useContactsQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, Eye, Trash2,Search,X } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, DialogClose, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteContactsMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { contacts } from "@/types/contacts";

export default function ContactTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: contacts } = useContactsQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = contacts?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteContact, isPending } = useDeleteContactsMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        contact?: contacts;
    }>({ open: false });

    const contactList = contacts?.data?.data?.data ?? [];
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
                        <TableHead  className="border-r">Name</TableHead>
                        <TableHead  className="border-r">Email</TableHead>
                        <TableHead  className="border-r">Phone</TableHead>
                        <TableHead  className="border-r">Message</TableHead>
                        <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contactList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Contact Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            contactList.map((contact: contacts) => (
                                <TableRow key={contact.id}>
                                    <TableCell  className="border-r border-b">{`${contact.first_name} ${contact.last_name}`}</TableCell>
                                    <TableCell className="border-r border-b">{contact.email}</TableCell>
                                    <TableCell className="border-r border-b">{contact.phone}</TableCell>
                                    <TableCell className="border-r border-b">{contact.message}</TableCell>
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, contact })}
                                            >
                                                <Eye />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Contact?"
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
                                                                deleteContact(contact.id),
                                                                {
                                                                    loading: "Deleting Contact...",
                                                                    success: "Contact deleted successfully!",
                                                                    error: "Error deleting Contact.",
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
                <Dialog open={dialogState.open} onOpenChange={(isOpen) => setDialogState({ open: isOpen })}>
                    <DialogOverlay className="fixed inset-0 bg-black/50 z-50" onClick={() => setDialogState({ open: false })}/>
                        <div
                            className="fixed top-10 left-1/2 transform -translate-x-1/2 
                                bg-white rounded-xl p-6 max-w-md w-full z-50 
                                max-h-[calc(100vh-5rem)] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DialogTitle className="text-xl font-semibold">Contact Details</DialogTitle>

                        <div>
                            <p> <strong>Name:</strong> {dialogState.contact?.first_name+' '+dialogState.contact?.last_name} </p>
                            <p> <strong>Email:</strong> {dialogState.contact?.email} </p>
                            <p> <strong>Phone:</strong> {dialogState.contact?.phone} </p>
                            <p> <strong>Message:</strong> {dialogState.contact?.message} </p>
                        </div>

                <DialogClose asChild>
                <Button
                    variant={"ghost"}
                    onClick={() => setDialogState({ open: false })}
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700" >
                    <X />
                </Button>
                </DialogClose>
            </div>
            </Dialog>
                
                
            )}
            </Fragment>
    );
}
