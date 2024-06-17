'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/utils/supabase/client";
import { Trash2 } from "lucide-react"
import { useToast } from "./ui/use-toast";
import { useState } from "react";

type DeleteDialogProps = {
    id: string
    handleFormSubmit: () => void
}

export default function DeleteDialog({ id, handleFormSubmit } : DeleteDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const {toast} = useToast();
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
            if(response.status === 204) {
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
                <Button variant="destructive" size='sm'>
                    <Trash2 size={16} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Delete student record?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this student record? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form onSubmit={handleDelete}>
                        <Button disabled={loading} variant='destructive' type="submit">
                            { loading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
