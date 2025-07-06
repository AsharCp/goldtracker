import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-yellow-500 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <p className="text-sm">© {new Date().getFullYear()} GoldenVoice. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/" className="cursor-pointer hover:underline">
            Home
          </Link>
          <Link to="/rates" className="cursor-pointer hover:underline">
            Rates
          </Link>
        </div>
      </div>
    </footer>
  );
}
