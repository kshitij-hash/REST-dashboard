import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    LogOut,
} from "lucide-react"
import Image from 'next/image'
import logo from '@/../assets/rocket-edu.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { logout } from '../app/login/actions'
import { createClient } from "@/utils/supabase/server"
import { ModeToggle } from "./toggleTheme"

export default async function Navbar() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const avatarText = data?.user?.email?.[0]?.toUpperCase() ?? 'CN';

    return (
        <nav className='flex justify-between items-center gap-2 p-4'>
            <div className='flex items-center gap-2'>
                <Image
                    src={logo}
                    alt='Rocket Education'
                    width={40}
                    height={40}
                    className='rounded-full'
                />
                <p className='text-md'>Rocket Education of Science & Technology</p>
            </div>
            <div className="flex gap-2">
                <ModeToggle />
                {data?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="hover:cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>{avatarText}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>{data?.user?.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <form action={logout}>
                                    <button className='flex items-center'>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <></>
                )}
            </div>
        </nav>
    )
}