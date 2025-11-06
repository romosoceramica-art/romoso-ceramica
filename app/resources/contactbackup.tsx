"use client";
import React, { useState, FormEvent } from "react";
import { FiPlus, FiMinus, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactUs() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact-us/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: fullName, email, subject, message }),
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                console.error("Failed to parse JSON:", err);
                alert("Server returned invalid response.");
                return;
            }

            if (data.success) {
                alert("Message sent successfully!");
                setFullName("");
                setEmail("");
                setSubject("");
                setMessage("");
            } else {
                alert(`Failed to send message. ${data.error || ""}`);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        }
    };

    const faqs = [
        {
            q: "How can I contact customer support?",
            a: "You can reach us via phone, email, or by filling out the contact form above. Our team usually responds within 24 hours.",
        },
        {
            q: "Where are you located?",
            a: "We are located in New York, USA – Str. First Avenue 1, NY 1060.",
        },
        {
            q: "What is the average response time?",
            a: "Our average response time is within 12–24 hours on business days.",
        },
        {
            q: "Do you offer 24/7 support?",
            a: "Currently, we provide support during business hours (Mon–Fri). For urgent issues, you can call our hotline.",
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 overflow-hidden text-white">
            {/* Animated Gradient Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-black via-gray-800 to-gray-600 rounded-full opacity-30 animate-pulse-slow mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-800 via-gray-700 to-black rounded-full opacity-25 animate-pulse-slow mix-blend-overlay"></div>

            {/* Header */}
            <div className="relative h-80 w-full">
                <img
                    src="/assets/images/contact_us/contactus2.jpg"
                    alt="Contacts"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
                <h1 className="absolute top-1/2 left-10 text-5xl md:text-6xl font-bold transform -translate-y-1/2 drop-shadow-lg">
                    Contact Us
                </h1>
                <div className="absolute bottom-5 right-10 bg-white/20 px-4 py-1 rounded shadow-sm text-gray-100 font-medium text-sm">
                    Home / Contacts
                </div>
            </div>

            {/* Main Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 relative z-10"
            >
                {/* Left Info */}
                <div className="space-y-6">
                    <p className="uppercase text-sm text-gray-400 font-semibold tracking-wider">
                        Get in touch
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        We are always ready to help you and answer your questions
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Reach out to our expert team for any queries or assistance. We
                        ensure timely and professional responses to all your questions.
                    </p>

                    <div className="grid grid-cols-2 gap-6 text-gray-200">
                        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-2xl transition">
                            <h3 className="font-semibold text-lg">Call Center</h3>
                            <p>800 100 975 20 34</p>
                            <p>(123) 1800-234-5678</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-2xl transition">
                            <h3 className="font-semibold text-lg">Our Location</h3>
                            <p>USA, New York - 1060</p>
                            <p>Str. First Avenue 1</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-2xl transition">
                            <h3 className="font-semibold text-lg">Email</h3>
                            <p>neuros@mail.co</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-2xl transition">
                            <h3 className="font-semibold text-lg">Working Hours</h3>
                            <p className="flex items-center gap-2">
                                <FiClock /> Mon – Fri: 9AM – 6PM
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                            Send Us a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
                            />
                            <textarea
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
                                rows={5}
                                required
                            />
                            <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20 relative z-10"
            >
                <div className="max-w-4xl mx-auto px-6 space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex justify-between items-center p-6 text-left bg-gradient-to-r from-gray-800 via-gray-900 to-black hover:from-gray-700 hover:to-gray-900 transition"
                            >
                                <span className="font-semibold text-lg text-white">{faq.q}</span>
                                <span
                                    className={`text-gray-300 transform transition-transform duration-300 ${openIndex === i ? "rotate-180 scale-110" : "rotate-0"
                                        }`}
                                >
                                    {openIndex === i ? <FiMinus size={22} /> : <FiPlus size={22} />}
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-500 ease-in-out ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <p className="p-6 text-gray-300 leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative z-10 py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black"
            >
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        Find Our Showroom
                    </h2>
                    <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.463689!2d55.448156!3d25.4053264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE5LjIiTiA1NcKwMjYnNTMuNCJF!5e0!3m2!1sen!2sin!4v1695979999999!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
