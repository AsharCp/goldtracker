import React from "react";
import { Link } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const incrementClick = async () => {
    const ref = doc(db, "clickStats", "homeClicks");
    await updateDoc(ref, {
      count: increment(1),
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      {/* Section 1 */}
      <section className="w-full bg-white p-4 sm:p-6 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full flex flex-col items-center text-center">
          <p className="text-sm text-yellow-600 font-semibold mb-2">Welcome to GoldenVoice.</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Stay Updated with Daily Gold Rates in Kerala
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Get accurate and up-to-date gold price information for 22K and 24K gold in Kerala.
          </p>
          <Link to="/rates">
            <button
              onClick={incrementClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow"
            >
              View Today’s Gold Rate →
            </button>
          </Link>
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <Link to="/rates" className="w-full">
            <div
              onClick={incrementClick}
              className="flex flex-col items-center border border-yellow-300 rounded-lg p-6 shadow bg-white cursor-pointer hover:shadow-lg transition w-full"
            >
              <p className="font-bold text-lg text-gray-800 mb-1">22K Gold Rate</p>
              <p className="text-sm text-gray-500 text-center">Click to view details</p>
            </div>
          </Link>

          <Link to="/rates" className="w-full">
            <div
              onClick={incrementClick}
              className="flex flex-col items-center border border-yellow-300 rounded-lg p-6 shadow bg-white cursor-pointer hover:shadow-lg transition w-full"
            >
              <p className="font-bold text-lg text-gray-800 mb-1">24K Gold Rate</p>
              <p className="text-sm text-gray-500 text-center">Click to view details</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
