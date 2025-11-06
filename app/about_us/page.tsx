"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Card, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaCubes, FaLeaf, FaGem, FaHandshake, FaWarehouse, FaBorderAll, FaChair, FaHome, FaBath, FaProjectDiagram, FaStore, FaTools, FaBuilding } from "react-icons/fa";


export default function AboutUs() {
    const highlightData = [
        { icon: <FaCubes />, title: "New", sub: "Fresh Vision" },
        { icon: <FaGem />, title: "100%", sub: "Quality Focus" },
        { icon: <FaLeaf />, title: "Modern", sub: "Designs" },
        { icon: <FaHandshake />, title: "Trusted", sub: "Customer Care" },
    ];

    const whyChoose = [
        { icon: <FaCubes />, title: "Premium Quality", desc: "Durable, reliable, crafted with care" },
        { icon: <FaGem />, title: "Elegant Designs", desc: "Timeless & modern patterns" },
        { icon: <FaLeaf />, title: "Eco-Friendly", desc: "Sustainable practices" },
        { icon: <FaHandshake />, title: "Customer Focused", desc: "Satisfaction at the heart" },
    ];

    const galleryImages = [
        "/assets/images/all_tiles_product/ONICE-COBALTO_1-scaled.jpg",
        "/assets/images/all_tiles_product/ORANGE-SAPPHIRE_1-scaled.jpg",
        "/assets/images/all_tiles_product/ARENARIA_STONE_IVORY_1-scaled.jpg",
        "/assets/images/all_tiles_product/JADE_1-scaled.jpg",
        "/assets/images/all_tiles_product/GREEN-MAJESTIC_1-scaled.jpg",
    ];

    const furnitureImages = [
        "/assets/images/all_tiles_product/ONICE-COBALTO_1-scaled.jpg",
        "/assets/images/all_tiles_product/ORANGE-SAPPHIRE_1-scaled.jpg",
        "/assets/images/all_tiles_product/ARENARIA_STONE_IVORY_1-scaled.jpg",
        "/assets/images/all_tiles_product/JADE_1-scaled.jpg",
        "/assets/images/all_tiles_product/GREEN-MAJESTIC_1-scaled.jpg",
    ];


    const services = [
        {
            icon: <FaBath size={32} />,
            title: "Carpets & Rugs",
            desc: "There are many variations of passages of Lorem Ipsum available majority",
        },
        {
            icon: <FaHome size={32} />,
            title: "Laminate Flooring",
            desc: "There are many variations of passages of Lorem Ipsum available majority",
        },
        {
            icon: <FaChair size={32} />,
            title: "Vinyl Flooring",
            desc: "There are many variations of passages of Lorem Ipsum available majority",
        },
    ];


    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    // Auto slider for gallery
    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prev) => (prev + 1) % galleryImages.length);
        }, 3000); // every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const FlexContainer = (props: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 4,
                maxWidth: 1200,
                mx: "auto",
            }}
            style={props.style}
        >
            {props.children}
        </Box>
    );

    const Section = (props: { bg?: string; children: React.ReactNode; style?: React.CSSProperties }) => (
        <Box
            sx={{
                py: 16,
                bgcolor: props.bg || undefined,
                background: props.bg
                    ? undefined
                    : "linear-gradient(to right, rgba(243,244,246,0.7), rgba(255,255,255,0.5), rgba(243,244,246,0.7))",
                backdropFilter: "blur(2px)",
            }}
            style={props.style}
        >
            {props.children}
        </Box>
    );

    return (
        <Box
            className="min-h-screen relative overflow-hidden"
            style={{
                backgroundImage: `url('/assets/images/background/back3.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",

            }}
        >
            {/* Hero Section */}
            <div className="relative h-[28rem] w-full overflow-hidden">

                {/* 1. Background Image */}
                <img
                    src="/assets/images/about/about_us.jpg"
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
                        <h1 className="text-4xl sm:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl text-center sm:text-left mb-4 sm:mb-0">
                            About Us
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
                                About Us
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            {/* Highlights Section (white background) */}
            <Section >
                <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
                    Welcome to{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(to right, #000, #0f766e)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Romoso Ceramica
                    </Box>
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        mb: 10,
                        color: "#555",
                        maxWidth: 720,
                        mx: "auto",
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                    }}
                >
                    Romoso Ceramica offers premium tiles and slabs for modern spaces, combining
                    aesthetics, durability, and sustainable design solutions.
                </Typography>

                <FlexContainer>
                    {highlightData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            style={{ flex: "0 0 25%" }}
                        >
                            <Card
                                sx={{
                                    p: 6,
                                    borderRadius: 4,
                                    textAlign: "center",
                                    background: "rgba(255,255,255,0.9)",
                                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        mx: "auto",
                                        mb: 3,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg,#0f766e,#000)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: "1.8rem",
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{
                                        mb: 1,
                                        background: "linear-gradient(to right,#000,#0f766e)",
                                        WebkitBackgroundClip: "text",
                                        color: "transparent",
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography sx={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                    {item.sub}
                                </Typography>
                            </Card>
                        </motion.div>
                    ))}
                </FlexContainer>
            </Section>


            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    py: 12,
                    px: { xs: 2, md: 8, lg: 12 },
                    // bgcolor: "#F3F3F3FF",
                }}
            >
                {/* Left overlapping images */}
                <Box
                    sx={{
                        position: "relative",
                        flex: { xs: "1 1 100%", md: "1 1 45%" },
                        minHeight: 400,
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: { xs: "80%", md: "70%" },
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                            overflow: "hidden",
                            zIndex: 2,
                        }}
                    >
                        <Image
                            src="/assets/images/about/about2.jpg" // replace with your image
                            alt="Kitchen"
                            width={600}
                            height={400}
                            style={{ objectFit: "cover", width: "100%", height: "auto" }}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: { xs: "80%", md: "70%" },
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <Image
                            src="/assets/images/about/about1.jpg" // replace with your image
                            alt="Bathroom"
                            width={600}
                            height={400}
                            style={{ objectFit: "cover", width: "100%", height: "auto" }}
                        />
                    </Box>
                </Box>

                {/* Right content */}
                <Box flex={{ xs: "1 1 100%", md: "1 1 45%" }}>
                    <Typography
                        sx={{
                            textTransform: "uppercase",
                            color: "#d97706",
                            fontWeight: "600",
                            mb: 1,
                            letterSpacing: 1,
                        }}
                    >
                        About Us
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 2, lineHeight: 1.3 }}
                    >
                        Choose Your Color What <br /> You Want For Your Home
                    </Typography>

                    <Typography sx={{ mb: 4, color: "text.secondary", maxWidth: 500 }}>
                        At Romoso Ceramica With a wide range of premium tiles and slabs, we bring together design, durability, and innovation to transform interiors and exteriors alike. Our collections are crafted to meet the highest standards of quality, offering versatile solutions that blend aesthetics with functionality.

                        Whether you’re designing a modern home, a luxury space, or a large-scale project, Romoso Ceramica provides the perfect foundation to create lasting impressions.
                    </Typography>


                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Box>
                            {/* Icons Section */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 8,
                                    mb: 4,
                                    flexWrap: "wrap",
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <FaWarehouse size={36} color="#d97706" />
                                        <Typography fontWeight={600} fontSize="1.1rem">
                                            Industrial Flooring
                                        </Typography>
                                    </Box>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <FaBorderAll size={36} color="#d97706" />
                                        <Typography fontWeight={600} fontSize="1.1rem">
                                            Laminate Flooring
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Box>

                            {/* Bullet Points */}
                            <motion.ul
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                                style={{
                                    paddingLeft: "20px",
                                    marginBottom: "24px",
                                    color: "#555",
                                    lineHeight: "1.8",
                                }}
                            >
                                <li>It is a long established fact of elegance that a reader will be distracted</li>
                                <li>Romoso Ceramica defines quality in every design</li>
                                <li>There are many variations of timeless style</li>


                            </motion.ul>

                            {/* Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {/* <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#111827",
                    px: 5,
                    py: 1.8,
                    borderRadius: 0,
                    fontWeight: "600",
                    letterSpacing: 1,
                    fontSize: "0.9rem",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  READ MORE →
                </Button> */}
                            </motion.div>
                        </Box>
                    </motion.div>
                </Box>
            </Box>
            {/* Services Section */}
            <Box sx={{ py: 12, px: { xs: 2, md: 8, lg: 12 }, bgcolor: "#FAFAFADF", }}>
                {/* Heading */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 6,
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                textTransform: "uppercase",
                                color: "#d97706",
                                fontWeight: 600,
                                letterSpacing: 1,
                                mb: 1,
                            }}
                        >
                            Our Expertise
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            Comprehensive Tile Solutions
                        </Typography>
                    </Box>
                </Box>

                {/* Services */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr 1fr" },
                        gap: 4,
                    }}
                >
                    {[
                        {
                            icon: <FaTools />, // Tile fixing
                            title: "Tile Fixing Services",
                            desc: "Professional tile installation with precision, durability, and a flawless finish for every space.",
                        },
                        {
                            icon: <FaStore />, // Tile selling
                            title: "Tile Selling",
                            desc: "Extensive collection of premium tiles available at competitive prices, tailored to every design need.",
                        },
                        {
                            icon: <FaProjectDiagram />, // End-to-end solution
                            title: "End-to-End Solutions",
                            desc: "From consultation to installation, we provide complete tile solutions under one trusted roof.",
                        },
                        {
                            icon: <FaBuilding />, // One-stop shop
                            title: "One-Stop Shop",
                            desc: "Discover everything related to tiles—variety, quality, and service—all in one convenient place.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Box
                                sx={{
                                    p: 5,
                                    bgcolor: "#fff",
                                    borderRadius: 3,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    height: "100%",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                                        "& .hoverLine": { width: "100%" },
                                        "& .iconBox": {
                                            background: "linear-gradient(135deg, #d97706, #000)",
                                            color: "#fff",
                                        },
                                    },
                                }}
                            >
                                {/* Icon with gradient hover */}
                                <Box
                                    className="iconBox"
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        bgcolor: "#fbbf24",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                        fontSize: "1.5rem",
                                        color: "#111",
                                        transition: "all 0.4s ease",
                                    }}
                                >
                                    {item.icon}
                                </Box>

                                {/* Text */}
                                <Typography
                                    fontWeight={700}
                                    variant="h6"
                                    sx={{ mb: 1, color: "#111827" }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography sx={{ color: "text.secondary", mb: 3 }}>
                                    {item.desc}
                                </Typography>

                                {/* Bottom line animation */}
                                <Box
                                    className="hoverLine"
                                    sx={{
                                        mt: "auto",
                                        height: "3px",
                                        width: "0%",
                                        bgcolor: "#d97706",
                                        borderRadius: "2px",
                                        transition: "width 0.4s ease",
                                    }}
                                />
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            </Box>

            {/* Auto-Sliding Gallery Section */}
            <Box
                sx={{
                    py: 12,
                    px: { xs: 3, md: 8, lg: 14 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(to bottom, #ECECECFF, #ECECECFF)",
                }}
            >
                {/* Left Content */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            fontWeight: 600,
                            color: "#0f766e",
                            letterSpacing: 2,
                            mb: 1,
                            textTransform: "uppercase",

                        }}
                    >
                        One Stop Shop for Tiles
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                            mb: 3,
                            fontSize: { xs: "2rem", md: "2.8rem" },
                            lineHeight: 1.2,
                        }}
                    >
                        Discover your{" "}
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(to right, #000, #0f766e)",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            dream tiles
                        </Box>
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "1.1rem",
                            maxWidth: 520,
                            lineHeight: 1.7,
                        }}
                    >
                        From <strong>tile fixing</strong> to <strong>tile selling</strong>,
                        we provide an end-to-end solution. Explore premium designs, durable
                        finishes, and aesthetic styles that fit perfectly in your space.
                    </Typography>
                </Box>

                {/* Right Auto-Sliding Gallery */}
                <Box
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        position: "relative",
                        py: 4,
                    }}
                >
                    {/* Gradient Fade Overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background: "linear-gradient(to right, #fafafa, transparent)",
                            zIndex: 2,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 80,
                            background: "linear-gradient(to left, #fafafa, transparent)",
                            zIndex: 2,
                        }}
                    />

                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            style={{
                                display: "flex",
                                gap: "28px",
                            }}
                        >
                            {[...furnitureImages, ...furnitureImages].map((src, idx) => (
                                <Card
                                    key={idx}
                                    sx={{
                                        minWidth: 260,
                                        height: 300,
                                        borderRadius: 4,
                                        overflow: "hidden",
                                        flexShrink: 0,
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                                        },
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Tile ${idx}`}
                                        width={320}
                                        height={300}
                                        style={{ objectFit: "cover" }}
                                    />
                                </Card>
                            ))}
                        </motion.div>
                    </Box>

                </Box>
                {/* Mobile Grid */}
                <Box
                    sx={{
                        display: { xs: "grid", md: "none" },
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                    }}
                >
                    {furnitureImages.map((src, idx) => (
                        <Card
                            key={idx}
                            sx={{
                                width: "100%",
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Tile ${idx}`}
                                width={300}
                                height={200}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-r mb-20 from-black via-gray-900 to-black py-20 px-6 md:px-12 lg:px-20 text-center text-white overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Discover our premium tiles and slabs collection designed to inspire.
                    </p>
                    <Link
                        href="/products"
                        className="bg-white/80 backdrop-blur-md text-black px-8 py-3 rounded-full font-semibold hover:bg-white transition transform hover:scale-105 border border-white/30"
                    >
                        Explore Products
                    </Link>
                </div>
                {/* Background accents */}
                <div className="absolute top-0 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>
            </section>
        </Box >
    );
}
