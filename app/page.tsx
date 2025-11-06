"use client";
import React, { useState, useEffect, useRef } from "react";
// Import Link for internal navigation
import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

// Icons for the "Why Choose Us" section
import PublicIcon from '@mui/icons-material/Public'; // Eco Conscious / Global Reach
import HandshakeIcon from '@mui/icons-material/Handshake'; // Customer Focus
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // For View More button
import DiamondIcon from '@mui/icons-material/Diamond'; // New icon for elegance
import PaletteIcon from '@mui/icons-material/Palette'; // New icon for design
import ArchitectureIcon from '@mui/icons-material/Architecture'; // For Design
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'; // For Quality

// --- NEW PALETTE CONSTANTS (Luxurious Light/Dark/Gold) ---
const PRIMARY_LIGHT = "#FFFFFF"; // Pure White (Main Background)
const SECONDARY_LIGHT = "#F5F5F5"; // Light Grey (Alternate Section Background)

const PRIMARY_LIGHT_1 = "#FFFFFFBC";

// Light Grey (Alternate Section Background) translated to a similar light gradient with blur
const SECONDARY_LIGHT_1 = "from-white/70 via-gray-50/50 to-gray-100/70 backdrop-blur-sm";

const ACCENT_GOLD = "#B58E5E"; // Rich, slightly deeper Gold/Brass
const TEXT_DARK = "#212121"; // Deep almost-black for text on light background
const TEXT_LIGHT = "#FFFFFF"; // Pure White for text on dark background
const TEXT_ACCENT_GRADIENT_DARK = `linear-gradient(to right, ${ACCENT_GOLD}, ${TEXT_DARK})`; // Gold to Dark gradient

export default function HomeLandingWithServices() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  // Scroll logic for Parallax on Hero Section
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // --- IMAGE CONSTANTS DEFINITIONS ---

  // 1. Hero Carousel Images
  const heroImages = [
    "/assets/images/all_tiles_product/ONICE-COBALTO_1-scaled.jpg",
    "/assets/images/all_tiles_product/ORANGE-SAPPHIRE_1-scaled.jpg",
    "/assets/images/all_tiles_product/ARENARIA_STONE_IVORY_1-scaled.jpg",
  ];

  // 2. Who We Are Section Collage Images
  const whoWeAreImages = [
    "/assets/images/home/sections/use1.jpg", // Top-Left image
    "/assets/images/home/sections/use2.jpg", // Bottom-Right image
  ];

  // 3. Why Choose Us Section Collage Images
  const whyChooseUsImages = [
    "/assets/images/home/sections/use3.jpg", // Top-Left image
    "/assets/images/home/sections/use4.jpg", // Bottom-Right image
  ];

  // Featured Products (unchanged)
  const featuredProducts = [
    {
      title: "BLACK GOLD",
      desc: "Timeless elegance for luxury interiors.",
      img: "/assets/images/all_tiles_product/BLACK-GOLD_1-scaled.jpg",
      delay: 0.1,
    },
    {
      title: "EMOTION EUPHORIA",
      desc: "A bold statement piece with deep blue veins.",
      img: "/assets/images/all_tiles_product/EMOTION_EUPHORIA_1.jpg",
      delay: 0.2,
    },
    {
      title: "JADE",
      desc: "High-durability for outdoor and flooring.",
      img: "/assets/images/all_tiles_product/JADE_1-scaled.jpg",
      delay: 0.3,
    },
    {
      title: "Jade Green",
      desc: "Vibrant, nature-inspired wall cladding.",
      img: "/assets/images/all_tiles_product/GREEN-MAJESTIC_1-scaled.jpg",
      delay: 0.4,
    },
  ];

  const typingText = "Romoso Ceramica";
  const tagline = "Crafting Elegance in Tiles & Slabs";
  const [displayText, setDisplayText] = useState("");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Typing effect for the main title (unchanged)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(typingText.substring(0, i + 1));
      i++;
      if (i === typingText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotating carousel effect (Slower for elegance) (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // --- NEW CAROUSEL LOGIC: Focused 3-Card Stack ---
  const getCarouselPosition = (index: number, length: number) => {
    const isCenter = index === currentHeroIndex;
    const isNext = index === (currentHeroIndex + 1) % length;
    const isPrev = index === (currentHeroIndex - 1 + length) % length;

    let xOffset = 0;
    let rotation = 0;
    let scale = 0.8;
    let zIndex = 1;
    let opacity = 0;
    let yLift = 0;

    if (isCenter) {
      xOffset = 0;
      scale = 1.1; // Large center card
      zIndex = 10;
      opacity = 1;
      yLift = -20; // Lift the center card significantly
    } else if (isNext) {
      xOffset = 250; // Smaller card positioned to the right
      scale = 0.9;
      zIndex = 5;
      opacity = 0.7;
      rotation = 5; // Subtle tilt
    } else if (isPrev) {
      xOffset = -250; // Smaller card positioned to the left
      scale = 0.9;
      zIndex = 5;
      opacity = 0.7;
      rotation = -5; // Subtle tilt
    } else {
      // Hidden cards are stacked far back and small
      scale = 0.6;
      opacity = 0;
      zIndex = 0;
    }

    return {
      x: xOffset,
      y: yLift,
      scale: scale,
      zIndex: zIndex,
      rotateY: rotation,
      opacity: opacity,
    };
  };

  // Removed scrollToServices as the button is now a Link
  const whyChooseUsFeatures = [
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: ACCENT_GOLD }} />,
      title: "Certified Quality",
      desc: "Built to last a lifetime with cutting-edge production techniques and stress-tested materials.",
      delay: 0.1,
    },
    {
      icon: <ArchitectureIcon sx={{ fontSize: 40, color: ACCENT_GOLD }} />,
      title: "Design Prowess",
      desc: "A perfect blend of high-end aesthetics, artistic vision, and modern architectural needs.",
      delay: 0.2,
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40, color: ACCENT_GOLD }} />,
      title: "Global Sustainability",
      desc: "We are committed to sustainability through environmentally friendly and low-waste manufacturing.",
      delay: 0.3,
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40, color: ACCENT_GOLD }} />,
      title: "Client Partnership",
      desc: "Receive personalized service, expert consultation, and support for your entire project.",
      delay: 0.4,
    },
  ];

  // =========================================================================
  // === RENDER START ===
  // =========================================================================

  return (
    // Main background set to Pure White
    <Box sx={{
      position: "relative", backgroundImage: `url('/assets/images/background/back3.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }} >
      {/* ================= HERO SECTION (Dark Background for Contrast) ================= */}
      <Box ref={heroRef} sx={{ height: "100vh", position: "relative", overflow: "hidden", bgcolor: TEXT_DARK }}>
        <motion.img
          src="/assets/images/home/home.jpg"
          alt="Background"
          style={{ scale: heroImageScale }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-[1.2]" // Darker image, high contrast
        />
        {/* Darker overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 h-full"
        >
          {/* Left Text */}
          <div className="text-left text-white w-full md:w-1/2 flex flex-col justify-center space-y-6 pt-20 md:pt-0">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-7xl md:text-8xl font-serif font-extrabold leading-tight tracking-tighter" // Font-serif for elegance, tight tracking
              style={{
                // Gold/White Gradient for the title
                background: `linear-gradient(to right, ${ACCENT_GOLD}, ${TEXT_LIGHT})`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>

            <Typography
              variant="h5"
              sx={{ color: ACCENT_GOLD, maxWidth: "550px", fontWeight: 500, fontStyle: 'italic', letterSpacing: 2 }} // Italic and wider tracking
            >
              {tagline}
            </Typography>

            {/* ELEGANT BUTTON: LINKED TO /catalogue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link href="/catalogue"

                className="
                    mt-8 px-14 py-4 
                    bg-transparent 
                    text-white
                    font-sans tracking-widest text-lg // Clean sans-serif and larger
                    rounded-full 
                    border-2 border-amber-500 
                    transition-all duration-300 ease-in-out 
                    shadow-lg shadow-transparent // Start transparent
                    
                    // Hover effect: Background fills with gradient, text becomes white, border hides
                    hover:bg-gradient-to-r hover:from-amber-600 hover:to-yellow-700 
                    hover:text-white 
                    hover:border-transparent
                    hover:shadow-2xl hover:shadow-amber-500/50 // Deep gold shadow on hover
                    transform hover:scale-[1.02]
                  "
              >
                Explore Our Collections
              </Link>
            </motion.div>
          </div>

          {/* Right Carousel - NEW CENTER-FOCUSED 3D STACK */}
          <div className="hidden lg:flex w-full md:w-1/2 relative h-[500px] items-center justify-center">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              // Add overall perspective tilt to the group for dramatic look
              style={{ transform: 'perspective(1800px) rotateX(8deg)' }}
            >
              {heroImages.map((src, index) => {
                const pos = getCarouselPosition(index, heroImages.length);
                const isActive = index === currentHeroIndex;

                return (
                  <motion.div
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)} // Click to advance
                    // The width and height are slightly larger than before
                    className={`absolute w-[280px] h-[400px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 transform-gpu`}
                    style={{
                      // Apply calculated transforms from getCarouselPosition
                      x: pos.x,
                      y: pos.y,
                      scale: pos.scale,
                      zIndex: pos.zIndex,
                      rotateY: pos.rotateY,
                      opacity: pos.opacity,

                      // 3D properties
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',

                      // Gold border only on the active card
                      border: isActive ? `3px solid ${ACCENT_GOLD}` : '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isActive
                        ? `0 20px 40px rgba(181, 142, 94, 0.6)` // Intense gold glowing shadow
                        : '0 10px 20px rgba(0, 0, 0, 0.4)', // Subtle dark shadow
                    }}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                      scale: pos.scale,
                      rotateY: pos.rotateY,
                      opacity: pos.opacity,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    whileHover={{
                      scale: isActive ? 1.1 : pos.scale * 1.05, // Slight hover scale for all cards
                      zIndex: 100, // Bring hovered card slightly forward
                    }}
                  >
                    <img
                      src={src}
                      alt={`Tile ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Subtle Bottom Wave Divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 20%)',
            backgroundColor: PRIMARY_LIGHT
          }}
        />
      </Box>

      {/* ================= WHO WE ARE (Light Grey Background) ================= */}
      <Box sx={{ py: 10, px: { xs: 5, md: 10 }, bgcolor: PRIMARY_LIGHT_1, }}>
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Collage - Subtle White/Grey Theme */}
            <div className="relative w-full h-[450px]">
              <motion.img
                initial={{ opacity: 0, rotate: -15, x: -50 }}
                whileInView={{ opacity: 1, rotate: -5, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                src={whoWeAreImages[0]}
                alt="Exterior House Design"
                className="absolute top-0 left-0 w-3/4 h-3/4 object-cover rounded-3xl shadow-2xl shadow-gray-400/50 border-4 border-white"
              />
              <motion.img
                initial={{ opacity: 0, rotate: 15, x: 50 }}
                whileInView={{ opacity: 1, rotate: 5, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src={whoWeAreImages[1]}
                alt="Interior House Design"
                className="absolute top-1/4 right-0 w-2/3 h-2/3 object-cover rounded-3xl shadow-2xl shadow-gray-600/50 border-4 border-white"
              />
            </div>

            {/* Right Content (Unchanged) */}
            <div className="space-y-4 pt-10 lg:pt-0">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  background: TEXT_ACCENT_GRADIENT_DARK,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: "3rem",
                  fontFamily: 'serif',
                }}
              >
                Our Vision & Heritage
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: ACCENT_GOLD, fontWeight: 600, letterSpacing: 1 }}
              >
                Craftsmanship Beyond Compare
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: TEXT_DARK, mb: 3, lineHeight: 1.7 }}
              >
                **Romoso Ceramica** combines artistry with precision engineering to
                redefine modern architecture. From stunning exteriors to elegant
                interiors, our designs reflect **timeless craftsmanship** and
                innovation for every living space. We deliver a product that is not just
                a material, but a legacy.
              </Typography>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { icon: <DiamondIcon sx={{ color: ACCENT_GOLD, fontSize: 32 }} />, title: "Premium Quality" },
                  { icon: <PaletteIcon sx={{ color: ACCENT_GOLD, fontSize: 32 }} />, title: "Modern Design" },
                  { icon: <PublicIcon sx={{ color: ACCENT_GOLD, fontSize: 32 }} />, title: "Global Reach" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    className="bg-white rounded-xl p-4 text-center border-t-4 border-gray-100 shadow-md transition-all duration-300" // Light card style
                    style={{ borderColor: ACCENT_GOLD }}
                  >
                    {item.icon}
                    <Typography
                      variant="body2"
                      sx={{ color: TEXT_DARK, fontWeight: "bold", mt: 0.5 }}
                    >
                      {item.title}
                    </Typography>
                  </motion.div>
                ))}
              </div>

              {/* LEARN MORE BUTTON: LINKED TO /about_us */}
              <Link href="/about_us">
                <Button

                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    mt: 6,
                    bgcolor: ACCENT_GOLD,
                    color: TEXT_LIGHT, // White text on gold
                    px: 6,
                    py: 1.5,
                    borderRadius: "50px",
                    fontWeight: 600,
                    boxShadow: `0 8px 15px rgba(181, 142, 94, 0.4)`,
                    transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      bgcolor: "#A47E45",
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 20px rgba(181, 142, 94, 0.6)`,
                    },
                  }}
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Box>

      {/* ================= FEATURED PRODUCTS (Light Grey Section) (Unchanged) ================= */}
      <Box
        ref={featuredRef}
        sx={{
          py: 14,
          px: { xs: 5, md: 10 },
          bgcolor: "from-gray-50/70 via-white/50 to-gray-100/70 backdrop-blur-sm",
          position: 'relative'
        }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              background: TEXT_ACCENT_GRADIENT_DARK,
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "3rem", md: "4rem" },
              fontFamily: 'serif',
            }}
          >
            Signature Collections ✨
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#555",
              mb: 8,
              maxWidth: 800,
              mx: "auto",
              fontWeight: 400,
            }}
          >
            Discover a selection of our most sought-after and innovative tile and slab designs, chosen for their unparalleled beauty and quality.
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: product.delay }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-2xl shadow-gray-300/50 cursor-pointer transform-gpu transition-all duration-300 hover:shadow-gray-400/70"
                whileHover={{ scale: 1.05 }}
              >
                {/* Image Area */}
                <div className="h-[250px] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text Block */}
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: TEXT_DARK,
                      fontWeight: 700,
                      mb: 0.5,
                      fontFamily: 'serif',
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777" }}>
                    {product.desc}
                  </Typography>
                </Box>
                {/* Accent Gold Corner */}
                <div
                  className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] transition-all duration-300"
                  style={{
                    borderTopColor: ACCENT_GOLD,
                    borderRightColor: 'transparent',
                  }}
                />
              </motion.div>
            ))}
          </div>

          <Box sx={{ textAlign: "center", mt: 10 }}>
            {/* VIEW FULL CATALOGUE BUTTON: LINKED TO /catalogue */}
            <Link href="/catalogue">
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: ACCENT_GOLD,
                  color: TEXT_LIGHT,
                  px: 8,
                  py: 2,
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  boxShadow: `0 8px 20px rgba(181, 142, 94, 0.4)`,
                  transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    bgcolor: "#A47E45",
                    transform: "translateY(-3px)",
                    boxShadow: `0 12px 25px rgba(181, 142, 94, 0.6)`,
                  },
                }}
              >
                View Full Catalogue
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* ================= WHY CHOOSE US (White Background) ================= */}
      <Box
        ref={servicesRef}
        sx={{
          py: 14,
          px: { xs: 5, md: 10 },
          bgcolor: PRIMARY_LIGHT_1, // White Background
          color: TEXT_DARK,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content (Text and Features - Unchanged) */}
            <div className="space-y-4 order-2 lg:order-1">
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  background: TEXT_ACCENT_GRADIENT_DARK,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: "3rem",
                  fontFamily: 'serif',
                }}
              >
                The Romoso Advantage
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: ACCENT_GOLD, fontWeight: 600, letterSpacing: 1 }}
              >
                The Pillars of Excellence
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: TEXT_DARK, mb: 4, lineHeight: 1.7 }}
              >
                Our commitment goes beyond just manufacturing. We stand for a total
                package of **supreme quality**, cutting-edge design, sustainable
                practices, and unparalleled client support that elevates your
                project from concept to breathtaking completion.
              </Typography>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {whyChooseUsFeatures.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ scale: 1.05, backgroundColor: SECONDARY_LIGHT, boxShadow: `0 10px 20px rgba(0, 0, 0, 0.05)` }}
                    // Feature card has a clean white background with gold accent bar
                    className="flex space-x-4 p-5 border-t-4 rounded-xl shadow-lg bg-white transition-all duration-300"
                    style={{ borderColor: ACCENT_GOLD, boxShadow: `0 5px 15px rgba(0, 0, 0, 0.05)` }}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <Typography
                        variant="body1"
                        sx={{ color: TEXT_DARK, fontWeight: "bold" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#777" }}>
                        {item.desc}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Collage */}
            <div className="relative w-full h-[450px] order-1 lg:order-2">
              <motion.img
                src={whyChooseUsImages[0]}
                alt="Tile Focus 1"
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: -5, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
                className="absolute top-0 left-0 w-2/3 h-3/5 object-cover rounded-3xl shadow-2xl shadow-gray-400/50 border-4 border-white"
              />
              <motion.img
                src={whyChooseUsImages[1]}
                alt="Tile Focus 2"
                initial={{ rotate: 10, opacity: 0 }}
                whileInView={{ rotate: 5, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="absolute bottom-0 right-0 w-3/4 h-3/5 object-cover rounded-3xl shadow-2xl shadow-gray-600/50 border-4 border-white"
              />
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
}