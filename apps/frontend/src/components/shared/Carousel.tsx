'use client'
import { useState, useEffect } from 'react';
import prop1 from '../../../public/banners/prop.jpg';
import prop2 from '../../../public/banners/prop2.jpg';
import prop3 from '../../../public/banners/prop3.jpg';
import Image from 'next/image';

export default function Carousel() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [prop1, prop2, prop3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-[600px] overflow-hidden z-0">
            <figure className="flex w-full  transition-transform duration-500"
                style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className=" object-cover"
                    />
                ))}
            </figure>
        </div>
    );
}
