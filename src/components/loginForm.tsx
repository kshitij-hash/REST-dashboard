'use client'

import { useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

interface LoginFormProps {
    onSubmit: (formData: FormData) => Promise<{ error?: string }>
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const result = await onSubmit(formData);

        if (result?.error) {
            toast({
                title: 'Error Logging in',
                description: result.error,
                variant: 'destructive'
            });
            (e.target as HTMLFormElement).reset();
        }
        setLoading(false);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type='email'
                        id="email"
                        name='email'
                        placeholder="example@email.com"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type='password'
                        id="password"
                        placeholder="********"
                        name='password'
                        minLength={8}
                        required
                        disabled={loading}
                    />
                </div>
                <Button type='submit' disabled={loading} className='w-full'>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </div>
        </form>
    )
}