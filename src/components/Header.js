// src/components/Header.tsx
import React from "react";
// Assuming 'react-router-dom' is set up for client-side routing.
// In a Canvas environment, you would typically use a switch-case for navigation.
// For this design update, the Link components are kept as per the original code.
import { Link } from "react-router-dom"; 

export default function Header() {
  return (
    <header className="bg-[#4B3832] text-white shadow-xl py-4 px-6 md:py-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Cafe Name - Enhanced for prominent display */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#FAD02E] 
                     hover:text-yellow-300 transition-colors duration-300 ease-in-out 
                     transform hover:scale-105"
        >
          Roohi Cafe ☕
        </Link>

        {/* Navigation Links - Centered on small screens, aligned on larger */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg md:text-xl font-medium">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg hover:bg-[#6a504a] hover:text-[#FAD02E] 
                       transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
                       focus:ring-[#FAD02E] focus:ring-opacity-50"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 rounded-lg hover:bg-[#6a504a] hover:text-[#FAD02E] 
                       transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
                       focus:ring-[#FAD02E] focus:ring-opacity-50"
          >
            About
          </Link>
          <Link
            to="/summary"
            className="px-4 py-2 rounded-lg hover:bg-[#6a504a] hover:text-[#FAD02E] 
                       transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 
                       focus:ring-[#FAD02E] focus:ring-opacity-50"
          >
            Summary
          </Link>
        </nav>
      </div>
    </header>
  );
}
