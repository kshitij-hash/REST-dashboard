import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import StudentDetails from '@/components/studentDetails'

export default async function Dashboard() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className='flex flex-col'>
            <StudentDetails />
        </div>
    )
}