/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Location */}
                <div className="footer-section fade-in">
                    <h2><i className="fas fa-map-marker-alt"></i> Find Us</h2>
                    <p className="footer-name">Vijay Kumar <span className="footer-role">(CEO)</span></p>
                    <p>Hina Medical Agencies</p>
                    <p>
                        Shivam Market, Hisar Rd,<br />
                        Rohtak Station Diary Mohalla,<br />
                        Rohtak, Haryana 124001
                    </p>
                    <a
                        href="https://www.google.com/maps/dir//Shivam+market,+Hisar+Rd,+Rohtak+Station+Diary+Mohalla,+Rohtak,+Haryana+124001/@28.897599,76.49229,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390d850794a1deb7:0xc35dc3b9201d61e7!2m2!1d76.5746914!2d28.8976241?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link highlight-link"
                    >
                        <i className="fas fa-map-pin"></i> Navigate on Google Maps
                    </a>
                </div>

                {/* Contact */}
                <div className="footer-section fade-in delay-1">
                    <h2><i className="fas fa-phone-alt"></i> Contact</h2>
                    <a href="tel:9812341002" className="footer-link"><i className="fas fa-phone"></i> 9812341002 / 8683846092</a>
                    <a href="sms:9812341002" className="footer-link"><i className="fas fa-sms"></i> Send SMS</a>
                    <a href="mailto:hinamedicalagencies@gmail.com" className="footer-link"><i className="fas fa-envelope"></i> hinamedicalagencies@gmail.com</a>
                </div>

                {/* Social */}
                <div className="footer-section fade-in delay-2">
                    <h2><i className="fas fa-share-alt"></i> Share Us</h2>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Hina Medical Agencies. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
