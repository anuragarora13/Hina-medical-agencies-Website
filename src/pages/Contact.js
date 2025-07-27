import React, { useState } from 'react';
import './Contact.css';
import { SiGmail } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import Swal from 'sweetalert2';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdH_pRmmpX-tGaqwzHb-GeinvUgWUqUEEf0SWyowTdvaYb52g/formResponse';

        const formBody = new URLSearchParams();
        formBody.append('entry.720461949', formData.firstName);
        formBody.append('entry.110796310', formData.lastName);
        formBody.append('entry.903649757', formData.phone);

        fetch(formURL, {
            method: 'POST',
            mode: 'no-cors',
            body: formBody,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: `Thank you, ${formData.firstName}!`,
                    text: 'Your details have been submitted successfully. We will get in touch shortly.',
                    confirmButtonColor: '#0d47a1',
                    background: '#f0f9ff',
                });

                setFormData({ firstName: '', lastName: '', phone: '' });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Submission Failed',
                    text: 'Something went wrong. Please try again later.',
                });
                console.error('Error!', error.message);
            });
    };

    return (
        <div className="contact-container">
            <div className="contact-box">
                <h2 className="contact-heading">Get in Touch</h2>
                <p className="contact-subtitle">We’d love to hear from you. Fill out the form below!</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder=" " />
                        <label>First Name</label>
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder=" " />
                        <label>Last Name</label>
                    </div>
                    <div className="form-group">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder=" " />
                        <label>Phone Number</label>
                    </div>
                    <button type="submit" className="contact-submit">Send Message</button>
                </form>

                {/* Directions Section */}
                <div className="contact-info-section">
                    <h3 className="contact-info-heading">Reach Us Directly</h3>

                    {/* Gmail */}
                    <div className="contact-method">
                        <SiGmail size={24} color="#D44638" />
                        <a href="mailto:hinamedicalagencies@gmail.com" className="info-link">hinamedicalagencies@gmail.com</a>
                    </div>

                    {/* WhatsApp */}
                    <div className="contact-method">
                        <FaWhatsapp size={24} color="#25D366" />
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="info-link"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Google Map Location */}
                    <div className="contact-method">
                        <GoLocation size={24} color="#01579b" />
                        <p className="info-link">
                            Shivam Market, Hisar Rd, Rohtak Station Diary Mohalla, Rohtak, Haryana 124001
                        </p>
                        <a
                            href="https://www.google.com/maps/dir//Shivam+market,+Hisar+Rd,+Rohtak+Station+Diary+Mohalla,+Rohtak,+Haryana+124001/@28.897599,76.49229,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390d850794a1deb7:0xc35dc3b9201d61e7!2m2!1d76.5746914!2d28.8976241?entry=ttu"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="icons/map.png"
                                alt="Google Map Location"
                                className="map-thumbnail"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
