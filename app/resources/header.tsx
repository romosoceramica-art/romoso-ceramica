"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FaArrowUp } from "react-icons/fa";
import GoogleTranslate from "./googletranslate";

interface NavLink {
  name: string;
  path: string;
}

const SCROLL_THRESHOLD = 300;

// The Preloader component and its logic have been removed from here.

export default function Header() {
  // Removed: const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [menuAnimation, setMenuAnimation] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about_us" },
    { name: "Catalogue", path: "/catalogue" },
    { name: "Contact Us", path: "/contact_us" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
    // The exhaustive-deps lint rule is fine to ignore here if handleScroll is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "971567027043";
    const message = "Hello! I’d like to know more about your products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* The conditional wrapper <div> for floating buttons is removed. */}
      {/* The opacity class on the <header> is removed. */}

      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white font-poppins">

        {/* Header content */}
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Desktop Logo */}
          <div className="pl-12 md:block">
            <Link href="/">
              <img
                src="/assets/images/company_logo/logo_name.png"
                alt="Romoso Ceramica"
                className="h-10 w-auto object-contain transition-transform duration-300 scale-[6]"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Creative & Professional Look */}
          <nav className="hidden md:flex space-x-8 font-medium tracking-wide relative">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative text-md px-4 py-1 text-gray-800 transition-all group overflow-hidden"
              >
                {link.name}
                {/* Creative Gradient Underline/Indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[4px] w-full transform origin-left transition-all duration-300
                    ${pathname === link.path
                      ? "scale-x-100 bg-gradient-to-r from-gray-900 to-gray-500" // Active state
                      : "scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-gray-700 to-gray-400" // Hover state
                    }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section: Google Translate and Get Us Button */}
          <div className="hidden md:flex items-center space-x-4">
            <GoogleTranslate />

            {/* LINKED "Get Us" Button to /contact_us */}
            <Link href="/contact_us">
              <Button
                variant="contained"
                className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-900 text-white rounded-lg shadow-md px-5 h-10 font-medium tracking-wide transition-transform transform hover:scale-105"
              >
                Get Us
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center justify-end w-full">
            <IconButton
              onClick={() => {
                setMobileMenuOpen(true);
                setMenuAnimation(true);
              }}
              className="text-gray-900"
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </div>
        </div>

        {/* Mobile Drawer Menu (omitted for brevity) */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
            setMenuAnimation(false);
          }}
          PaperProps={{
            sx: {
              width: 280,
              background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
              color: "#111",
              padding: "1.5rem",
              boxShadow: 5,
            },
          }}
        >
          {/* Drawer Logo Centered + Close */}
          <div className="flex flex-col items-center mb-20 mt-8 relative">
            <IconButton
              onClick={() => {
                setMobileMenuOpen(false);
                setMenuAnimation(false);
              }}
              className="absolute -top-12 left-28 text-gray-900"
            >
              <CloseIcon />
            </IconButton>

            <img
              src="/assets/images/company_logo/logo_black.png"
              alt="Romoso ceramica"
              className="h-14 w-auto object-contain transition-transform duration-300 scale-[4]"
              onClick={() => handleNavClick("/")}
            />
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 rounded-md text-gray-900 text-sm font-medium tracking-wide text-left transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-700 ${pathname === link.path
                  ? "bg-gradient-to-r from-black to-gray-500 text-white"
                  : ""
                  }`}
              >
                {link.name}
              </button>
            ))}

            <Button
              variant="contained"
              onClick={() => handleNavClick("/contact_us")}
              className="mt-6 w-full rounded-lg text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-900 transform transition-all duration-300 font-medium tracking-wide"
            >
              Get Us
            </Button>

            <GoogleTranslate />
          </nav>
        </Drawer>
      </header>

      {/* Floating WhatsApp Button */}
      <div
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-[1000] p-4 rounded-full shadow-2xl cursor-pointer 
                   transition-all duration-300 ease-in-out bg-green-500 text-white 
                   hover:bg-green-600 hover:scale-110 
                   hover:shadow-[0_0_20px_rgba(34,197,94,0.8)]"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon fontSize="large" />
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-24 right-6 z-[1000] p-4 rounded-full shadow-2xl cursor-pointer 
                    transition-all duration-300 ease-in-out 
                    bg-gray-900 text-white hover:bg-gray-700 
                    animate-pulse 
                    hover:scale-110 hover:shadow-[0_0_25px_rgba(17,24,39,0.5)]
                    ${showScrollTop ? "opacity-100 visible" : "opacity-0 invisible"}`}
        title="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </>
  );
}