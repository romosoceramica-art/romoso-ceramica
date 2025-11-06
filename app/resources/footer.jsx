"use client";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  // Define navigation links with their correct paths
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about_us" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Contact", path: "/contact_us" },
  ];

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-gray-300 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          {/* Logo */}
          <div>
            <Link href="/" aria-label="Home">
              <img
                src="/assets/images/company_logo/logo_white.png"
                alt="Romoso Ceramica Logo"
                className="w-60 object-contain"
              />
            </Link>
            {/* You can re-enable this tagline if needed */}
            {/* <p className="mt-4 text-sm text-gray-400">
              Delivering quality products with trust and innovation.
            </p> */}
          </div>

          {/* Top Products - NOW PLAIN TEXT */}
          <div>
            <h2 className="text-white font-semibold mb-5 md:mt-10 uppercase tracking-wider">
              Top Products
            </h2>
            <ul className="space-y-3">
              {["Sense", "Orange Sapphire", "Taj Mahal", "Precious Stone"].map(
                (item) => (
                  <li key={item} className="text-gray-400 text-sm">
                    {/* Removed Link/Anchor for plain text */}
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links - NOW USING NEXT.JS LINK AND CORRECT PATHS */}
          <div>
            <h2 className="text-white font-semibold mb-5 md:mt-10 uppercase tracking-wider">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="relative text-gray-300 text-sm hover:text-white transition-colors duration-300
                      after:content-[''] after:absolute after:left-0 after:-bottom-1 
                      after:w-0 after:h-[2px] after:bg-white 
                      hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-white font-semibold mb-5 md:mt-10 uppercase tracking-wider">
              Contact Us
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Patrick@romosoceramica.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  Email: Patrick@romosoceramica.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+971567027043"
                  className="hover:text-white transition-colors duration-300"
                >
                  Phone: +971567027043
                </a>
              </li>
              {/* <li>Address: 123 Street, City</li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Romoso Ceramica. All rights reserved.</p>
          <div className="flex space-x-4 mt-5 md:mt-0">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#" // Replace # with actual social media links
                  aria-label={`Social media link ${idx + 1}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 
                             hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
                >
                  <Icon className="text-sm" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}