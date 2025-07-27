import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        closeSidebar();
    }, [location.pathname]);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrolling = window.scrollY > 20;
                    setScrolling(prev => (prev !== isScrolling ? isScrolling : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <NavLink to="/" className="navbar-logo" onClick={closeSidebar}>
                        <img src="/logo.png" alt="logo" className="logo-img" />
                        <div className="logo-text">
                            <h1>Hina <span>Medical</span> Agencies</h1>
                            <p className="sub-info">
                                Rohtak, Haryana &nbsp; | &nbsp;
                                <span className="gst">
                                    <img src="/icons/accept.png" alt="✓" className="check-icon" />
                                    GST No. 06ABLPK0537E1ZY
                                </span>
                            </p>
                        </div>
                    </NavLink>

                    <div className="navbar-contact desktop-only">
                        <a href="tel:+919812341002" className="contact-item">
                            <i className="fas fa-phone-alt"></i> +91 9812341002
                        </a>
                        <a href="mailto:hinamedicalagencies@gmail.com" className="contact-item">
                            <i className="fas fa-envelope"></i> hinamedicalagencies@gmail.com
                        </a>
                    </div>

                    <div className="hamburger" onClick={toggleSidebar}>☰</div>

                    <div className="navbar-links desktop-only">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img src="/logo.png" alt="logo" className="logo-img" />
                    <div className="sidebar-logo-text">
                        <h2>Hina <span>Medical</span> Agencies</h2>
                        <p>Rohtak, Haryana</p>
                        <p className="sidebar-gst">GST: 06ABLPK0537E1ZY</p>
                    </div>
                    <span className="sidebar-close" onClick={closeSidebar}>&times;</span>
                </div>

                <NavLink to="/" className="sidebar-link" onClick={closeSidebar}>Home</NavLink>
                <NavLink to="/contact" className="sidebar-link" onClick={closeSidebar}>Contact Us</NavLink>

                <div className="sidebar-contact">
                    <a href="tel:+919812341002" className="sidebar-contact-item">📞 +91 9812341002</a>
                    <a href="mailto:hinamedicalagencies@gmail.com" className="sidebar-contact-item">📧 hinamedicalagencies@gmail.com</a>
                </div>
            </div>

            {sidebarOpen && <div className="sidebar-overlay show" onClick={closeSidebar}></div>}
        </>
    );
}

export default Navbar;
