import React, { useState, useRef, useEffect } from 'react';
import brands from '../data/brandsData';
import './Home.css';

const BrandSlider = () => {
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);

    const handleImageError = (e) => {
        e.target.src = '/brands/default.png';
        e.target.alt = 'Default brand logo';
    };

    // Prevent blinking by checking observer only once
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsPaused(false);
                else setIsPaused(true);
            },
            { threshold: 0.1 }
        );
        if (sliderRef.current) {
            observer.observe(sliderRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section className="brands">
            <h2>Trusted Brands</h2>
            <div className="brand-slider">
                <div
                    ref={sliderRef}
                    className={`slider-track ${isPaused ? 'paused' : ''}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {[...brands, ...brands].map((brand, index) => (
                        <a
                            href={brand.link}
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="brand-link"
                        >
                            <img
                                src={brand.src}
                                alt={brand.name}
                                onError={handleImageError}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandSlider;
