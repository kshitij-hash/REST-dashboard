'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface LoginResult {
    error?: string
}

export async function login(formData: FormData): Promise<LoginResult> {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard');
}

export async function logout() {
    const supabase = createClient()

    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/login');
}