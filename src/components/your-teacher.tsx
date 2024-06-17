import Image from "next/image";
import logo from '../../assets/rocket-edu.png'

export default function YourTeacher() {
    return (
        <section className='flex flex-col items-center'>
            <div className='text-left w-full max-w-screen-xl'>
                <h2 className='text-xl font-bold mb-2'>
                    Meet your instructor
                </h2>
                <hr className="w-full border-gray-300 mb-4" />
            </div>
            <div className='w-full flex justify-center items-center gap-10'>
                <div className='flex flex-col items-center'>
                    <Image
                        src={logo}
                        alt='teacher'
                        className='rounded-full'
                        width={250}
                        height={250}
                    />
                </div>
                <div>
                    <h3 className='text-xl font-bold tracking-wide uppercase'>Abhijeet Rawat</h3>
                    <p className='text-xs text-gray-400'>
                        Physics, Chemistry, Mathematics and Biology
                    </p>
                    <p className='text-sm my-2'>
                        <span className="font-bold">10 years</span> of teaching experience
                    </p>
                    <p className="font-bold">Education</p>
                    <div className="border-l-2 border-gray-400">
                        <ul className="ml-2 leading-8">
                            <li>
                                <span className="text-gray-400">-</span> B.Ed.
                            </li>
                            <li>
                                <span className="text-gray-400">-</span> M.Sc. Clinical Psychology
                            </li>
                            <li>
                                <span className="text-gray-400">-</span> M.Sc. Physics
                            </li>
                            <li>
                                <span className="text-gray-400">-</span> B.Tech. Electronics & Communication Engineering
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}