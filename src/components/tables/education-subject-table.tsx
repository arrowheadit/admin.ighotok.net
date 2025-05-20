
import { useMemo } from "react";
import { useEducationSubjectQuery } from "@/queris";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "./pagination";
import { Button } from "../ui/button";
import { Archive, Loader, Loader2, PencilLine, Trash2 ,Search} from "lucide-react";
import { Fragment, useState } from "react";
import AddEducationSubjectDialog from "../dialogs/add-education-subject-dialog";
import ConfirmDeleteDialog from "../dialogs/pop-confirm-dialog";
import { useDeleteEducationSubjectMutation } from "@/mutations";
import { toast } from "sonner";
import { useEffect } from "react";
import { Input } from "@/components/ui/input"

export default function EducationSubjectTable({ populateEducationOptions }: { populateEducationOptions: (educationList: { value: number; label: string }[]) => void }) {
    // Removed duplicate declaration of educationOptionList
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const page_size = 10; 
    const sort_by = "id";
    const sort_type = "desc";
    // useEffect(() => { 

    // }, []);
     // This should be replaced with the actual total pages from your API response
    const { data: educationSubjects } = useEducationSubjectQuery({ page, page_size, sort_by, sort_type ,search});
    console.log('educationSubjects..', educationSubjects);
    const totalPages = educationSubjects?.data?.data?.last_page ?? 1;    
    const { mutateAsync: deleteEducationSubject, isPending } = useDeleteEducationSubjectMutation(); 
    const [dialogState, setDialogState] = useState<{
        open: boolean;
        eduSub?: { id: number; name: string;education_id: number;};
    }>({ open: false });

    const educationSubjectList = educationSubjects?.data?.data?.data ?? [];
    const educationOptionList = useMemo(() => {
        return educationSubjects?.data?.educations ?? [];
    }, [educationSubjects?.data?.educations]);
    useEffect(() => {
        if (educationOptionList.length > 0) {
            populateEducationOptions(educationOptionList);
        }
    }, [educationOptionList, populateEducationOptions]);  
    
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
                        <TableHead colSpan={2} className="border-r">Degree</TableHead>
                            <TableHead className="border-r">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {educationSubjectList.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center border-r">
                                    {isPending ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        <div className="flex flex-col items-center min-h-[200px] justify-center space-y-1">
                                            <Archive className="text-blue-400" size={72}/>
                                            <p className="text-gray-500 text-lg">No Education Subject Found</p>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ): 
                            educationSubjectList.map((educationSubject: { id: number, name: string,education_id:number, education: { degree: string }}) => (
                                <TableRow key={educationSubject.id}>
                                    <TableCell colSpan={2} className="border-r border-b">{educationSubject.name}</TableCell>
                                    <TableCell colSpan={2} className="border-r border-b">{educationSubject.education?.degree}</TableCell>

                                    <TableCell className="border-b">
                                        <div className="flex items-center ">
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => setDialogState({ open: true, eduSub:educationSubject })}
                                            >
                                                <PencilLine />
                                            </Button>
                                            <ConfirmDeleteDialog
                                                title="Are you sure?"
                                                description="Do you want to delete this Education Subject?"
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
                                                                deleteEducationSubject(educationSubject.id),
                                                                {
                                                                    loading: "Deleting Education Subjects...",
                                                                    success: "Education Subject deleted successfully!",
                                                                    error: "Error deleting Education Subject.",
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
                    <AddEducationSubjectDialog
                        dialogController={[dialogState.open, (open) => setDialogState({ open, eduSub: undefined })]}
                    editAbleEducationSubject={dialogState.eduSub}
                    educationOptions={educationOptionList}
                    />
                )}
        </Fragment>
    );
}
