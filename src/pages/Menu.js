// src/pages/Menu.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "cafeMenu"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    };
    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Our Menu
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
            Discover our carefully crafted selection of artisanal coffee, fresh pastries, and delicious treats
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {menuItems.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
                  <span className="text-lg font-bold">₹{item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {item.name}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {item.description}
                </p>
                
                {/* Prep Time */}
                <div className="flex items-center mb-6 text-gray-500">
                  <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{item.preparationTime} mins</span>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/menu/${item.id}`}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <span>View Details</span>
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {menuItems.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Menu...</h3>
            <p className="text-gray-600">Please wait while we fetch our delicious offerings</p>
          </div>
        )}
      </div>
    </div>
  );
}