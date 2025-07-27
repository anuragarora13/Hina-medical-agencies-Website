import React, { useState, useRef, useEffect } from 'react';
import brands from '../data/brandsData'; // Ensure this path is correct
import './Home.css'; // Make sure CSS below is included here

const BrandSlider = () => {
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const currentSlider = sliderRef.current;
        if (!currentSlider) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsPaused(prev => {
                    const shouldPause = !entry.isIntersecting;
                    return prev !== shouldPause ? shouldPause : prev;
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(currentSlider);
        return () => observer.disconnect();
    }, []);

    const handleImageError = (e) => {
        e.target.src = '/brands/default.png';
        e.target.alt = 'Default brand logo';
    };

    return (
        <section className="brands-section">
            <div className="slider-container">
                <div
                    ref={sliderRef}
                    className={`slider-track ${isPaused ? 'paused' : ''}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {[...brands, ...brands].map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="brand-slide">
                            <a
                                href={brand.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="brand-link"
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    className="brand-logo"
                                    onError={handleImageError}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandSlider;
