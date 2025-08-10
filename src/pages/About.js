// src/pages/About.tsx
import React from "react";
import { Coffee, MapPin, Phone } from "lucide-react"; // npm install lucide-react

export default function About() {
  return (
    <div className="bg-gradient-to-br from-[#FFF8F0] to-orange-50 min-h-screen text-[#4B3832] font-sans py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* About Section Header */}
        <div className="text-center mb-12">
          <Coffee size={64} className="text-[#FAD02E] mx-auto mb-4 drop-shadow-md" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
            Our Story at Roohi Cafe
          </h1>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Where every cup tells a tale, and every visit feels like coming home.
          </p>
        </div>

        {/* Main Content Block */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.005] transform">
          <p className="mb-6 text-lg md:text-xl leading-relaxed text-gray-700">
            Welcome to <span className="font-bold text-[#FAD02E] text-xl md:text-2xl">Roohi Cafe</span> — 
            your cozy spot for freshly brewed coffee, homemade pastries, and hearty meals. 
            Established in 2023, our cafe blends a warm, rustic atmosphere with a 
            menu crafted from the freshest locally sourced ingredients. We believe in creating a space 
            where quality meets comfort, a true haven for coffee lovers and food enthusiasts alike.
          </p>

          <p className="mb-6 text-lg md:text-xl leading-relaxed text-gray-700">
            Whether you’re here for a quick espresso on the go, a peaceful corner to 
            read a book, or a friendly place to share a meal, we’re here to make every 
            visit special. Our dedicated baristas are passionate about perfecting every pour, 
            and our kitchen team loves experimenting with seasonal flavors to bring you 
            new, delightful experiences with every bite.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            Come visit us, and let the inviting aroma of fresh coffee and baked bread welcome you. 
            At Roohi Cafe, we’re more than just a cafe — we’re a community. We look forward 
            to sharing our passion for great food and coffee with you!
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-3 text-lg text-gray-700 font-medium">
            <MapPin size={24} className="text-[#FAD02E]" />
            <span>123 Coffee Lane, Flavor Town</span>
          </div>
          <div className="flex items-center space-x-3 text-lg text-gray-700 font-medium">
            <Phone size={24} className="text-[#FAD02E]" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
    </div>
  );
}
