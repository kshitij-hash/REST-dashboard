import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import StudentDetails from '@/components/studentDetails'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard for the admin to manage the student details.",
}

export default async function Dashboard() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className='mt-4'>
            <StudentDetails />
        </div>
    )
}