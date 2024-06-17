'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useState } from "react";
import EditStudentForm from "./editStudentForm";

type EditDialogProps = {
    id: string
    handleFormSubmit: () => void
}

export default function EditDialog({ id, handleFormSubmit }: EditDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
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
