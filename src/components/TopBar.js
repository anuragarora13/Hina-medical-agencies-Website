/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './TopBar.css';

const TopBar = () => {
    const [show, setShow] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll < 100) {
                setShow(true);
            } else if (currentScroll > lastScroll) {
                setShow(false); // scrolling down
            } else {
                setShow(true); // scrolling up
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    return (
        <div className={`topbar ${show ? 'show' : 'hide'}`}>
            <div className="topbar-content">
                <div className="topbar-left">
                    <span><i className="fas fa-envelope"></i> hinamedicalagencies.com</span>
                    <span><i className="fas fa-phone"></i> +91 9812341002</span>
                </div>
                <div className="topbar-right">
                    <a href="#contact" className="topbar-btn">Get a Quote</a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
