import { createClient } from '@/utils/supabase/server';
import { login } from './actions'
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/loginForm';

export default async function LoginPage() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser()
    if (data.user) {
        redirect('/dashboard');
    }

    return (
        <section className='h-[calc(100vh-97px)] flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Welcome back! Login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm onSubmit={login} />
                </CardContent>
            </Card>
        </section>
    )
}