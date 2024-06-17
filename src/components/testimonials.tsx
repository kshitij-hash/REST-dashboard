'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from 'embla-carousel-autoplay'
import reviews from '@/../../reviews.json'
import { Card, CardContent } from "./ui/card";
import { useRef } from "react";

export default function Testimonials() {
    const plugin = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: true
        })
    )
    return (
        <div className='flex flex-col items-center mb-4'>
            <div className='text-left w-full max-w-screen-xl'>
                <h2 className='text-xl font-bold mb-2'>
                    Testimonials
                </h2>
                <hr className="w-full border-gray-300 mb-4" />
            </div>
            <Carousel
                className="w-full max-w-lg"
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                opts={{
                    loop: true
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-48">
                    {reviews.map((review, index) => (
                        <CarouselItem key={index} className="flex items-center justify-center">
                            <Card>
                                <CardContent className="flex flex-col item-start gap-2 p-6">
                                    <p className="text-md">{review.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {review.reviewText}
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}