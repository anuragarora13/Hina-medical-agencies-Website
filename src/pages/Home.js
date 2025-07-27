/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo, useCallback,useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import BrandSlider from './BrandSlider';
import { Helmet } from 'react-helmet-async'; // Added for SEO

// Data moved outside component for better organization
const BRANDS = [
    { logo: 'sun-pharma.png', alt: 'Sun Pharma' },
    { logo: 'cipla.png', alt: 'Cipla' },
    { logo: 'mankind.png', alt: 'Mankind Pharma' },
    { logo: 'zydus.png', alt: 'Zydus Cadila' },
    { logo: 'lupin.png', alt: 'Lupin' },
    { logo: 'dr-reddy.png', alt: 'Dr. Reddy' },
    { logo: 'torrent.png', alt: 'Torrent Pharma' },
    { logo: 'glenmark.png', alt: 'Glenmark' },
    { logo: 'alembic.png', alt: 'Alembic Pharma' },
    { logo: 'ipca.png', alt: 'Ipca Laboratories' },
    { logo: 'biocon.png', alt: 'Biocon' },
    { logo: 'divis.png', alt: 'Divis Laboratories' }
];

const TESTIMONIALS = [
    ['Reliable, fast, and genuine supplier.', 'RK Pharmacy, Panipat'],
    ['Pricing helped boost margins.', 'Global Pharmacy, Rewari'],
    ['Excellent packaging and timely delivery.', 'Sai Medicos, Delhi'],
    ['Best customer support in the industry.', 'Gupta Medical Store, Karnal'],
    ['Smooth onboarding. WhatsApp system rocks!', 'Medicure Point, Bahadurgarh'],
    ['Genuine stock and transparent billing.', 'Aarogya Chemist, Faridabad'],
    ['Customer support is lightning-fast.', 'Medline Pharmacy, Gurugram'],
    ['Inventory accuracy is amazing.', 'HealWell Store, Delhi'],
    ['Orders arrive on time, every time.', 'Ayush Pharmacy, Noida'],
    ['Two years of partnership — no complaints.', 'Sanjeevani Medico, Rohtak']
];

const SERVICES = [
    ['delivery.png', 'Fast Delivery', 'Next-day shipping'],
    ['licensed.png', 'Licensed & Genuine', '100% verified products'],
    ['support.png', 'Personal Support', 'Phone & WhatsApp support'],
    ['shield.png', 'Return Guarantee', 'Prompt return resolution'],
    ['credit-card.png', 'Secure Payment', 'GST billing & secure gateways'],
    ['customer-review.png', 'Client Satisfaction', 'Rated 4.9★ by 500+ stores'],
];

const FEATURES = [
    ['store.svg', '10000+ trusted retail stores'],
    ['authenticity.png', '100% authentic & licensed supply'],
    ['work-experience-icon.png', '25+ years of industry experience'],
    ['dispatch-icon.png', 'Fast dispatch & secure packaging'],
    ['manager.png', 'Dedicated account managers'],
    ['payment-icon.png', 'GST billing with secure payments'],
    ['satisfaction-icon.png', 'Customer Satisfaction'],
    ['quality-assurance-icon.png', 'Quality Assurance'],
];

const HELP_ITEMS = [
    '📞 Call or WhatsApp with your requirements',
    '📋 Receive options with best pricing',
    '🚚 Quick dispatch and delivery',
    '🧾 Transparent GST billing',
    '🤝 Personalized support for bulk orders'
];

function Home() {
    const [statsAnimated, setStatsAnimated] = useState(false);
    const statsRef = useRef(null);

    // Memoized stats data
    const statsData = useMemo(() => [
        { value: 25, suffix: '+', label: 'Years of Trusted Service', description: 'Delivering quality since 1998' },
        { value: 10000, suffix: '+', label: 'Pharmacies Partnered', description: 'Across multiple states' },
        { value: 500, suffix: '+', label: 'Quality Products', description: 'From trusted manufacturers' },
        { value: 98, suffix: '%', label: 'Delivery Accuracy', description: 'On-time, every time' }
    ], []);

    // Structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Hina Medical Agencies",
        "description": "Wholesale distributor of generic medicines in Haryana since 1998",
        "url": "https://hinamedical.com",
        "logo": "https://hinamedical.com/logo.png",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Street Address",
            "addressLocality": "Rohtak",
            "addressRegion": "Haryana",
            "postalCode": "124001",
            "addressCountry": "IN"
        },
        "telephone": "+919812341002",
        "openingHours": "Mo-Sa 08:00-20:00",
        "sameAs": [
            "https://facebook.com/hinamedical",
            "https://linkedin.com/company/hinamedical"
        ],
        "areaServed": ["Haryana", "North India"],
        "founder": "Mr. XYZ",  // Added founder info
        "foundingDate": "1998"
    };
    // Animation initialization
    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            easing: 'ease-out-quad',  // Smoother easing
            offset: 100,
            mirror: false
        });

        return () => AOS.refresh();
    }, []);


    // Number counting animation
    const animateNumbers = useCallback(() => {
        if (statsAnimated) return;
        setStatsAnimated(true);

        // Use GSAP for smoother animations if available
        if (window.gsap) {
            statsData.forEach((stat, i) => {
                gsap.to(`.stat-number-${i}`, {
                    innerHTML: stat.value,
                    duration: 2,
                    ease: "power1.out",
                    snap: { innerHTML: 1 },
                    stagger: 0.1,
                    onUpdate: function () {
                        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerHTML);
                    }
                });
            });
        } else {
            // Fallback to vanilla JS animation
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.floor(progress * target);

                    stat.textContent = value.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };

                requestAnimationFrame(animate);
            });
        }
    }, [statsAnimated, statsData]);

    // Intersection Observer setup

    // Intersection Observer with improved configuration
    useEffect(() => {
        if (!statsRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        }, {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.2
        });

        observer.observe(statsRef.current);

        return () => observer.disconnect();
    }, [animateNumbers]);

    // Add tabindex for keyboard navigation
    useEffect(() => {
        const focusableElements = document.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        focusableElements.forEach(el => el.setAttribute('tabindex', '0'));
    }, []);


    return (
        <main className="home" id="top">


            {/* SEO Meta Tags */}
            <Helmet>
                <title>Hina Medical Agencies | Trusted Medicine Wholesaler in Haryana</title>
                <meta name="description" content="Leading distributor of generic medicines since 1998. Serving 10,000+ pharmacies with 500+ products. GST certified supplier in Rohtak, Haryana." />
                <meta name="keywords" content="medicine wholesaler, pharmacy supplier, generic medicines, Haryana, Rohtak, drug distributor" />
                <link rel="canonical" href="https://hinamedical.com" />

                {/* OpenGraph with more details */}
                <meta property="og:title" content="Hina Medical Agencies | Trusted Medicine Wholesaler" />
                <meta property="og:description" content="25+ years of trusted medicine distribution in North India. Serving pharmacies with genuine products at competitive prices." />
                <meta property="og:url" content="https://hinamedical.com" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://hinamedical.com/og-image.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter with more details */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hina Medical Agencies" />
                <meta name="twitter:description" content="Trusted medicine wholesaler in Haryana since 1998" />
                <meta name="twitter:image" content="https://hinamedical.com/twitter-card.jpg" />
                <meta name="twitter:site" content="@hinamedical" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="hero" aria-label="Main introduction">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>Revolutionizing Healthcare Through Affordable & Authentic Generic Medicines</h1>
                            <p>
                                Serving 10,000+ pharmacies across Haryana and nationwide.
                                Delivering trusted healthcare solutions since <strong>1998</strong>.
                            </p>
                        </div>
                        <div className="hero-action">
                            <Link to="/contact" className="hero-cta" aria-label="Partner with us">
                                Partner with Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            {/* About Section */}

            <section className="about" data-aos="fade-up" data-aos-delay="100">
                <div className="about-container">
                    <div className="about-wrapper">
                        <h2 className="about-title">Who We Are</h2>
                        <div className="about-content">
                            {/* ... (same content) ... */}
                        </div>
                        <div className="about-stats" ref={statsRef}>
                            {statsData.map((stat, index) => (
                                <div
                                    className="stat-card"
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={150 + index * 50}
                                >
                                    <div className="stat-number-wrapper">
                                        <span
                                            className={`stat-number stat-number-${index}`}
                                            data-count={stat.value}
                                            aria-live="polite"
                                        >
                                            0
                                        </span>
                                        <span className="stat-suffix">
                                            {stat.suffix === '+' ? '+' : '%'}
                                        </span>
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                    <div className="stat-description">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section
                className="why-choose"
                data-aos="fade-up"
                data-aos-delay="200"
                aria-labelledby="why-choose-title"
            >
                <h2 id="why-choose-title">Why Choose Hina Medical?</h2>
                <div className="why-cards">
                    {FEATURES.map(([icon, text], index) => (
                        <div
                            className="why-card"
                            key={index}
                            data-aos="zoom-in"
                            data-aos-delay={100 + index * 50}
                        >
                            <img
                                src={`/icons/${icon}`}
                                alt=""
                                loading="lazy"
                                width="48"
                                height="48"
                            />
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brands Slider */}
            <section className="brands" data-aos="zoom-in-up" data-aos-delay="300">
                <h2>Our Trusted Companies</h2>
                <BrandSlider brands={BRANDS} />
            </section>

            {/* Testimonials */}
            <section className="testimonials" data-aos="fade-left" data-aos-delay="400">
                <h2>What Our Clients Say</h2>
                <div className="testimonial-cards">
                    {TESTIMONIALS.map(([msg, client], i) => (
                        <div className="testimonial" key={i} data-aos="zoom-in" data-aos-delay={100 + i * 100}>
                            <p>"{msg}"</p>
                            <h4>- {client}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            
            <section className="services" data-aos="flip-left" data-aos-delay="500">
                <h2>What We Offer</h2>
                <div className="service-grid">
                    {SERVICES.map(([icon, title, desc], i) => (
                        <div
                            className="service-item"
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            aria-label={`Learn more about ${title}`}
                        >
                            <img
                                src={`/icons/${icon}`}
                                alt=""
                                loading="lazy"
                                width="64"
                                height="64"
                            />
                            <h4>{title}</h4>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
                {/* ... */}
            </section>  

            {/* How We Help */}
            <section className="how-we-help" data-aos="fade-up" data-aos-delay="600">
                <div className="container">
                    <h2>How We Help You</h2>
                    <ul className="help-list">
                        {HELP_ITEMS.map((item, index) => (
                            <li key={index} data-aos="fade-up" data-aos-delay={100 + index * 100}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <div className="cta-content" data-aos="fade-up">
                    <h2>Let's Grow Together 🚀</h2>
                    <p>Pharmacies, clinics, or distributors – we're ready to support your business.</p>
                    <ul className="cta-points">
                        <li> Trusted by 10000+ retailers</li>
                        <li> 25+ years in the industry</li>
                        <li> Transparent pricing & GST billing</li>
                        <li> Support over WhatsApp & Call</li>
                    </ul>
                    <div className="cta-buttons">
                        <a href="https://wa.me/919812341002" className="cta-btn whatsapp" target="_blank" rel="noopener noreferrer">
                            <img src="/icons/whatsapp.png" alt="WhatsApp" loading="lazy" />
                            WhatsApp Us
                        </a>
                        <a href="tel:+919812341002" className="cta-btn call">
                            <img src="/icons/call.png" alt="Call" loading="lazy" />
                            Call Now
                        </a>
                        <a href="mailto:hinamedicalagencies@gmail.com" className="cta-btn email">
                            <img src="/icons/email.png" alt="Email" loading="lazy" />
                            Email Us
                        </a>
                    </div>
                </div>
            </section>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/919812341002"
                className="whatsapp-float focus:outline-none focus:ring-0"
                target="_blank"
                rel="noopener noreferrer"
                data-aos="zoom-in"
                data-aos-delay="800"
                aria-label="Contact us on WhatsApp"
            >
                <img src="/icons/whatsapp.svg" alt="WhatsApp" loading="lazy" />
            </a>

            <a
                href="#top"
                className="back-to-top focus:outline-none focus:ring-0"
                aria-label="Back to top"
                onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            >
                {/* ... */}
            </a>

            
        </main>
    );
}

export default Home;