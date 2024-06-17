'use client'
import { GetStudentData } from "@/app/dashboard/actions"
import { Student, columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react";
import FormDialog from "./FormDialog";

export default function StudentDetails() {
    const [data, setData] = useState<Student[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = () => {
        setFormSubmitted(!formSubmitted);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await GetStudentData();
            setData(response);
        }
        fetchData();
    }, [formSubmitted]);

    return (
        <div className="container mx-auto">
            <FormDialog handleFormSubmit={handleFormSubmit} />
            <DataTable columns={columns} data={data} handleFormSubmit={handleFormSubmit}/>
        </div>
    )
}