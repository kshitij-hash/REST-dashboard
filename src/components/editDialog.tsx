'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/utils/supabase/client";
import { Edit, Trash2 } from "lucide-react"
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import EditStudentForm from "./editStudentForm";

type DeleteDialogProps = {
    id: string
    handleFormSubmit: () => void
}

export default function EditDialog({ id, handleFormSubmit }: DeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const { toast } = useToast();
    const handleDelete = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        const supdabase = createClient();

        try {
            const response = await supdabase
                .from('Students')
                .delete()
                .eq('id', id);

            console.log(response);
            if (response.status === 204) {
                toast({
                    title: 'Student record deleted',
                    description: 'The student record has been deleted successfully.',
                })
            } else {
                toast({
                    title: 'An error occurred',
                    description: `${response.error?.message}` || 'An error occurred while deleting the student record.',
                    variant: 'destructive'
                })
            }
            handleClose();
            handleFormSubmit();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>
                    <Edit size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <EditStudentForm id={id} onClose={handleClose} handleFormSubmit={handleFormSubmit} />
            </DialogContent>
        </Dialog>
    )
}
