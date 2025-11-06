"use client";
import React, { useState, FormEvent } from "react";
import { FiPlus, FiMinus, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // 1. Revert to the standard API route path
      // The endpoint is typically /api/your_route_name
      const res = await fetch("/api/contact_us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, subject, message }),
      });

      // 2. Check the HTTP Status (e.g., check for 200 OK, and catch 404, 500, etc.)
      if (!res.ok) {
        // Log the HTTP status for debugging (e.g., 404 Not Found)
        console.error(`HTTP Error: ${res.status} ${res.statusText}`);

        // Try to get a helpful error message if the server sent one (even in non-200 responses)
        let errorDetails = `Server returned status ${res.status}.`;
        try {
          const errorBody = await res.json();
          if (errorBody.error) {
            errorDetails = errorBody.error;
          }
        } catch (jsonErr) {
          // If the failed response wasn't JSON (like an HTML 404 page), 
          // we skip parsing and keep the generic status message.
        }

        alert(`Failed to send message: ${errorDetails}`);
        return;
      }

      // 3. Parse JSON only after confirming the response is OK
      let data;
      try {
        data = await res.json();
      } catch (err) {
        // This catches the 'Unexpected token <' error if a non-JSON body slips through
        console.error("Failed to parse JSON (Server returned non-JSON response):", err);
        alert("Server returned an unreadable response.");
        return;
      }

      // 4. Handle the success/failure state defined by the API's JSON body
      if (data.success) {
        alert("Message sent successfully!");
        // Reset form fields
        setFullName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        // Handle logical errors defined in the API's JSON (e.g., 'invalid email')
        alert(`Failed to send message: ${data.error || "Unknown server response."}`);
      }
    } catch (err) {
      // Catches network errors (e.g., server completely unreachable)
      console.error("Network or fetch error:", err);
      alert("A network error occurred. Please check your connection.");
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
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/images/background/back3.jpg')`, // 👈 set your background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // creates subtle parallax feel
      }}
    >
      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Main content container */}
      <div className="relative z-10 bg-gradient-to-b from-gray-50/70 via-white/50 to-gray-100/70 backdrop-blur-sm">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply opacity-30 translate-x-1/3 translate-y-1/3"></div>

        <div className="relative h-[28rem] w-full overflow-hidden">

          {/* 1. Background Image */}
          <img
            src="/assets/images/contact_us/contactus2.jpg"
            alt="Modern, architectural background representing connection"
            className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-105" // 👈 Added subtle hover effect
          />

          {/* 2. Gradient Overlay for Typography Clarity and Depth */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-gray-900/80 via-black/80 to-gray-900/80"
          />

          <div className="absolute inset-0 max-w-7xl mx-auto flex flex-col justify-center px-6 sm:px-12">

            <div className="flex flex-col sm:flex-row justify-between items-center w-full">

              {/* Heading: Centered on Mobile, Left-aligned on Desktop */}
              <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl 
                       text-center sm:text-left mb-4 sm:mb-0">
                Contact Us
                <div className="w-16 h-1 bg-white mt-3 rounded-full mx-auto sm:mx-0" />
              </h1>

              {/* Breadcrumb: Aligns nicely with heading on Mobile, to the right on Desktop */}
              <div className="md:mt-[30%] flex items-center space-x-2 text-base md:text-xl text-gray-300">

                <Link
                  href="/"
                  className="text-white hover:text-gray-400 transition-colors duration-300 font-medium"
                >
                  Home
                </Link>

                <span className="text-gray-400 font-light">/</span>

                <span className="font-bold text-gray-500 tracking-wider">
                  Contact Us
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 relative z-10">
            {/* Left Info Section */}
            <div>
              <p className="uppercase text-sm text-gray-500 mb-2">
                Get in touch
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                We are always ready to help you and answer your questions
              </h2>
              <p className="text-gray-700 mb-8">
                Reach out to our expert team for any queries or assistance. We
                ensure timely and professional responses to all your questions.
              </p>
              <div className="grid grid-cols-2 gap-6 text-gray-800">
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl transition">
                  <h3 className="font-semibold text-lg">Call Center</h3>
                  <p>800 100 975 20 34</p>
                  <p>(123) 1800-234-5678</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl transition">
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p>USA, New York - 1060</p>
                  <p>Str. First Avenue 1</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl transition">
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p>neuros@mail.co</p>
                </div>
                <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl transition">
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p className="flex items-center gap-2">
                    <FiClock /> Mon – Fri: 9AM – 6PM
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/85 backdrop-blur-md p-8 rounded-xl shadow-md max-w-md mx-auto">
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                  Get in Touch
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    rows={5}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
                  >
                    Send a message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="from-gray-50/70 via-white/50 to-gray-100/80 backdrop-blur-sm relative z-10"
        >
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-black mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-md"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 hover:from-gray-100 hover:to-gray-300 transition"
                  >
                    <span className="font-semibold text-lg text-gray-900">
                      {faq.q}
                    </span>
                    <span
                      className={`text-gray-700 transform transition-transform duration-300 ${openIndex === i
                        ? "rotate-180 scale-110"
                        : "rotate-0"
                        }`}
                    >
                      {openIndex === i ? (
                        <FiMinus size={22} />
                      ) : (
                        <FiPlus size={22} />
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-in-out ${openIndex === i
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                      } overflow-hidden`}
                  >
                    <p className="p-5 text-gray-700 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="backdrop-blur-sm relative z-10"
        >
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-black mb-6 text-center">
              Find Our Showroom
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.463689!2d55.448156!3d25.4053264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzE5LjIiTiA1NcKwMjYnNTMuNCJF!5e0!3m2!1sen!2sin!4v1695979999999!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
