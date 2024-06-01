import { createClient } from "@/utils/supabase/client"
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { FileSpreadsheetIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DownloadSheet() {
    const handleDownload = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('Students')
            .select(
                'id, name, class, phone, whatsapp, date'
            )
            .csv()

        if (error) {
            console.error('Error fetching data: ', error)
            return
        }

        const csvData = data;

        const rows = csvData.trim().split('\n').map(row => {
            return row.split(',').map(cell => cell.replace(/"/g, ''))
        })
        const worksheet = XLSX.utils.aoa_to_sheet(rows)

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx', type: 'array'
        })

        const blob = new Blob([excelBuffer], {
            type: 'application/octet-stream'
        })
        saveAs(blob, 'students.xlsx')
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant='ghost' onClick={handleDownload}>
                        <FileSpreadsheetIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Download Excel Sheet</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}