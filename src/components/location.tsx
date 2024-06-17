import { GoogleMapsEmbed } from '@next/third-parties/google'
import Image from 'next/image'
import restEntrance from '../../assets/rest-entrance.jpg'

export default function Location() {
    return (
        <div className='flex flex-col items-center mb-4'>
            <div className='text-left w-full max-w-screen-xl'>
                <h2 className='text-xl font-bold mb-2'>
                    Visit us
                </h2>
                <hr className="w-full border-gray-300 mb-4" />
            </div>
            <div className='w-full flex item-center justify-center gap-10'>
                <div>
                    <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAPS_API_KEY || ''}
                        height={380}
                        width={500}
                        mode="place"
                        q="Rocket Education of Science and Technology"
                    />
                </div>
                <div>
                    <Image
                        src={restEntrance}
                        alt='rocket-education-entrance'
                        width={500}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
}