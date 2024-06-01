import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import StudentForm from "./studentForm"
import { useState } from "react"

interface FormDialogProps {
    handleFormSubmit: () => void;
}

export default function FormDialog({
    handleFormSubmit
}: FormDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Add new student
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Add new student
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the form below to add a new student.
                    </DialogDescription>
                </DialogHeader>
                    <StudentForm onClose={handleClose} handleFormSubmit={handleFormSubmit}/>
            </DialogContent>
        </Dialog>
    )
}