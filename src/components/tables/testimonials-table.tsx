
import { useTestimonialsQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2,Search } from "lucide-react";
import { Fragment, useState } from "react";
import AddTestimonialDialog from "../dialogs/add-testimonial-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteFaqsMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import type { testimonials,updateTestimonials } from "@/types/testimonials";
export default function TestimonialsTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: testimonials } = useTestimonialsQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = testimonials?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteFaqs, isPending } = useDeleteFaqsMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        testimonials?: updateTestimonials;
    }>({ open: false });

    const testimonialsList = testimonials?.data?.data?.data ?? [];
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
                        <TableHead className="border-r">Content</TableHead>
                        <TableHead className="border-r">Designation</TableHead>
                            <TableHead className="border-r">Status</TableHead>
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonialsList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Testimonials Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            testimonialsList.map((testimonial: testimonials) => (
                                <TableRow key={testimonial.id}>
                                    <TableCell className="border-r border-b">{testimonial.name}</TableCell>
                                    <TableCell className="border-r border-b">{testimonial.image}</TableCell>
                                    <TableCell className="border-r border-b">{testimonial.content}</TableCell>
                                    <TableCell className="border-r border-b">{testimonial.designation}</TableCell>
                                    <TableCell className="border-r border-b">{testimonial.status}</TableCell>
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, testimonials:testimonial })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Testimonial?"
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
                                                                deleteFaqs(testimonials.id),
                                                                {
                                                                    loading: "Deleting Faqs...",
                                                                    success: "Faqs deleted successfully!",
                                                                    error: "Error deleting Faqs.",
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
                <AddTestimonialDialog
                    dialogController={[dialogState.open, (open) => setDialogState({ open, testimonials: undefined })]}
                    editAbleTestimonial={dialogState.testimonials}
                />
            )}
            </Fragment>
    );
}
