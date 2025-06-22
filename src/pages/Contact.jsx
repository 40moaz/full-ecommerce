import React, { useState, useRef } from "react";
import "../styles/Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_0ok6u0x",     // replace with your actual service ID
            "template_ceaif1h",    // replace with your actual template ID
            formRef.current,
            "VdfqC1PxEz1p8C0EX"      // replace with your actual public key
        )
        .then(() => {
            setSubmitted(true);
            setForm({ name: "", email: "", message: "" });
        })
        .catch((err) => {
            console.error("EmailJS error:", err);
            setError("Something went wrong. Please try again.");
        });
    };

    return (
        <div className="contact-container">
            <div className="contact-card">
                <h2>Contact Us</h2>
                <p>
                    We'd love to hear from you! Fill out the form below and our team will get back to you soon.
                </p>
                {submitted ? (
                    <div className="contact-success">
                        <h3>Thank you!</h3>
                        <p>Your message has been sent.</p>
                    </div>
                ) : (
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="you@example.com"
                            />
                        </label>
                        <label>
                            Message
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                placeholder="Type your message..."
                                rows={5}
                            />
                        </label>
                        <button type="submit">Send Message</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                )}
            </div>
            <div className="contact-info">
                <h3>Get in touch</h3>
                <p><strong>Email:</strong> amoaz14109@gmail.com</p>
                <p><strong>Phone:</strong> +20 1113140942</p>
                <p><strong>Address:</strong> 123 Commerce St, City, Country</p>
            </div>
        </div>
    );
};

export default Contact;
