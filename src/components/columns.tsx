"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Student = {
    id: string
    name: string
    class: string
    phone: string
    whatsapp: string
    date: string
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "class",
        header: "Class",
    },
    {
        accessorKey: "phone",
        header: "Phone Number",
    },
    {
        accessorKey: "whatsapp",
        header: "WhatsApp Number",
    },
    {
        accessorKey: "date",
        header: "Date of Joining",
    }
]
