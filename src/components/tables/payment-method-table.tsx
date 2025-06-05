
import { usePaymentMethodQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2,Search } from "lucide-react";
import { Fragment, useState } from "react";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeletePaymentMethodMutation } from "@/mutations";
import { toast } from "sonner";
import { Input } from "@/components/ui/input"
import  type { paymentMethodTypes, updatePaymentMethod } from "@/types/payment-method";
import { useNavigate } from "react-router-dom";
export default function PaymentMethodTable() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
     // This should be replaced with the actual total pages from your API response
    const { data: paymentMethod } = usePaymentMethodQuery({ page,page_size, sort_by, sort_type,search }); 
    const totalPages = paymentMethod?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deletePaymentMethod, isPending } = useDeletePaymentMethodMutation();   

    const paymentMethodList = paymentMethod?.data?.data?.data ?? [];
    console.log('paymentMethodList...',paymentMethodList);
    const handleEditPaymentMethodEvent = (selectedPaymentMethod:updatePaymentMethod) => {
        navigate(`/payment-methods/edit/${selectedPaymentMethod.slug}`,{state:selectedPaymentMethod})
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
                            <TableHead className="border-r">Min</TableHead>
                            <TableHead className="border-r">Max</TableHead>
                            <TableHead className="border-r">Fixed Charge</TableHead>
                            <TableHead className="border-r">Percentage Charge</TableHead>
                            <TableHead className="border-r">Status</TableHead>
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentMethodList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No PaymentMethod Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            paymentMethodList.map((paymentMethod: paymentMethodTypes) => (
                                <TableRow key={paymentMethod.id}>
                                    <TableCell className="border-r border-b">{paymentMethod.name}</TableCell>
                                    <TableCell className="border-r border-b"><img className="h-12" src={import.meta.env.VITE_API_SERVER_IMAGE_PATH+"gateway-images/"+paymentMethod.image} alt="Membership-Image"></img></TableCell>  
                                    <TableCell className="border-r border-b">{paymentMethod.min}</TableCell>
                                    <TableCell className="border-r border-b">{paymentMethod.max}</TableCell>
                                    <TableCell className="border-r border-b">{paymentMethod.fixed_charge}</TableCell>
                                    <TableCell className="border-r border-b">{paymentMethod.percent_charge}</TableCell>
                                    <TableCell className="border-r border-b"><span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${paymentMethod.status==="inactive" ? "bg-red-100 text-red-800 font-bold" : "bg-green-100 text-green-800 font-bold"}`}>
                                        {paymentMethod.status}
                                    </span></TableCell>
                                    
                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => handleEditPaymentMethodEvent(paymentMethod)}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="You want to delete this Payment Method?"
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
                                                                deletePaymentMethod(paymentMethod.id),
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
