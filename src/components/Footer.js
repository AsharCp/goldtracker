// src/components/Footer.tsx
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // npm install lucide-react

export default function Footer() {
  return (
    <footer className="bg-[#4B3832] text-gray-200 py-10 shadow-inner mt-12">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Cafe Info Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-extrabold text-[#FAD02E] mb-3 tracking-tight">
            Roohi Cafe
          </h2>
          <p className="mt-2 text-md leading-relaxed">
            Brewing happiness, one cup at a time. Crafted with passion and served with a smile.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-xl text-white mb-3 border-b-2 border-[#FAD02E] pb-1">
            Reach Out
          </h3>
          <p className="mt-2 text-md flex items-center gap-2">
            <span role="img" aria-label="phone">📞</span> +91 98765 43210
          </p>
          <p className="mt-1 text-md flex items-center gap-2">
            <span role="img" aria-label="email">✉️</span> roohicafe@example.com
          </p>
          <p className="mt-1 text-md flex items-center gap-2">
            <span role="img" aria-label="location">📍</span> 123 Cafe Street, Cochin, Kerala
          </p>
        </div>

        {/* Social Links Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-xl text-white mb-3 border-b-2 border-[#FAD02E] pb-1">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start space-x-6 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#FAD02E] transition-transform transform hover:scale-125 duration-300 ease-in-out"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#FAD02E] transition-transform transform hover:scale-125 duration-300 ease-in-out"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#FAD02E] transition-transform transform hover:scale-125 duration-300 ease-in-out"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Information */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Roohi Cafe. All rights reserved.
      </div>
    </footer>
  );
}
