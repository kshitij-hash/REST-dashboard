'use server'
import { createClient } from "@/utils/supabase/server";

export async function AddStudentData(formData: FormData) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        throw new Error('User not logged in');
    }
    const userId = data.user.id;
    const studentData = {
        name: formData.get('name') as string,
        class: formData.get('class') as string,
        phone: formData.get('phone') as string,
        whatsapp: formData.get('whatsapp') as string,
        date: formData.get('date') as string,
        user_id: userId
    };

    const { error: studentError} = await supabase.from('Students').insert(studentData);
    
    if (studentError) {
        throw new Error(studentError.message);
    }
}

export async function GetStudentData() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        throw new Error('User not logged in');
    }
    const userId = data.user.id;
    const { data: studentData, error: studentError } = await supabase
        .from('Students')
        .select('*')
        .eq('user_id', userId)
        .order('date', {
            ascending: false
        });

    if (studentError) {
        throw new Error(studentError.message);
    }
    return studentData;
}