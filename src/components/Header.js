import React, { useState } from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const incrementClick = async () => {
    const ref = doc(db, "clickStats", "homeClicks");
    await updateDoc(ref, {
      count: increment(1),
    });
  };

  return (
    <header className="w-full bg-white shadow-md border-b border-yellow-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-yellow-600">GoldenVoice</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4 text-gray-700 font-medium">
          <Link
            to="/"
            className="px-3 py-1 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition"
          >
            Home
          </Link>
          <Link
            to="/rates"
            onClick={incrementClick}
            className="px-3 py-1 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition"
          >
            22K Rate
          </Link>
          <Link
            to="/rates"
            onClick={incrementClick}
            className="px-3 py-1 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition"
          >
            24K Rate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-yellow-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-yellow-100 hover:text-yellow-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/rates"
            onClick={() => {
              incrementClick();
              setMenuOpen(false);
            }}
            className="block px-3 py-2 rounded hover:bg-yellow-100 hover:text-yellow-700 transition"
          >
            22K Rate
          </Link>
          <Link
            to="/rates"
            onClick={() => {
              incrementClick();
              setMenuOpen(false);
            }}
            className="block px-3 py-2 rounded hover:bg-yellow-100 hover:text-yellow-700 transition"
          >
            24K Rate
          </Link>
        </div>
      )}
    </header>
  );
}
