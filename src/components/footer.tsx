import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from '@/../assets/rocket-edu.png'

export default function Footer() {
    return (
        <footer className='w-full flex items-center p-4 bg-gray-200 dark:bg-gray-900'>
            <div className='w-1/2 flex justify-center'>
                <Link href='/'>
                    <div className='flex items-center gap-2 hover:opacity-70'>
                        <Image
                            src={logo}
                            alt='Rocket Education'
                            width={35}
                            height={35}
                            className='rounded-full'
                        />
                        <p className='text-sm font-bold w-40 text-left'>
                            Rocket Education of Science & Technology
                        </p>
                    </div>
                </Link>
            </div>
            <div className="w-1/2 flex items-center justify-between">
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-sm">
                        Follow us on
                    </p>
                    <div className="flex gap-2">
                        <Link
                            className="border-2 p-2 rounded-full dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 border-gray-950 hover:bg-gray-950 hover:text-gray-200"
                            href='https://www.youtube.com/@rocketeducation2168'
                            target="_blank"
                        >
                            <Youtube size={16} />
                        </Link>
                        <Link
                            className="border-2 p-2 rounded-full dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 border-gray-950 hover:bg-gray-950 hover:text-gray-200"
                            href='https://www.instagram.com/'
                            target="_blank"
                        >
                            <Instagram size={16} />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-sm">
                    Chat with us on
                    <Link
                        href="https://wa.me/919910546525"
                        target="_blank"
                        className="border-2 p-2 rounded-full dark:border-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 border-gray-950 hover:bg-gray-950 hover:text-gray-200"
                    >
                        <div className="flex items-center gap-1">
                            <FaWhatsapp
                                size={16}
                            /> WhatsApp
                        </div>
                    </Link>
                </div>
                <div>
                    <p className="text-sm flex flex-col items-center gap-1">
                        Contact<a className="hover:underline" href="tel:+91 99105 46525">+91 99105 46525</a>
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Link href='/login'>
                        <Button className="text-sm" variant='link'>
                            Admin
                        </Button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
