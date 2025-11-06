"use client"; // 👈 REQUIRED: Allows using useState and useEffect

import { ReactNode, useState } from "react";
import React from "react";
import Header from "./resources/header";
import Footer from "./resources/footer";
import "./globals.css";
// 👇 Import the Preloader component
import Preloader from "./resources/preloader";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // 1. State to control the visibility of the loader and content
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      <body>
        {/* 2. Conditionally render the Preloader on initial load */}
        {/* The Preloader component sets isLoading(false) after its timer/animation */}
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}

        {/* 3. Main Content Wrapper */}
        {/* This div contains the entire visible page structure (Header, Main, Footer). */}
        {/* It uses a transition to smoothly fade in when loading is complete. */}
        <div
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}