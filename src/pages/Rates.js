// import React, { useEffect, useState } from 'react';
// import { doc, getDoc, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const Rates = () => {
//   const [currentRates, setCurrentRates] = useState(null);
//   const [previousRates, setPreviousRates] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showDiffZero, setShowDiffZero] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const currentRef = doc(db, 'goldRates', 'current');
//     const previousRef = doc(db, 'goldRates', 'previous');

//     const unsubCurrent = onSnapshot(currentRef, (docSnap) => {
//       if (docSnap.exists()) {
//         setCurrentRates(docSnap.data());
//       }
//     });

//     const fetchPrevious = async () => {
//       const prevSnap = await getDoc(previousRef);
//       if (prevSnap.exists()) {
//         setPreviousRates(prevSnap.data());
//       }
//       setLoading(false);
//     };

//     const checkNoonReset = () => {
//       const now = new Date();
//       const isPastNoon = now.getHours() >= 12;
//       setShowDiffZero(isPastNoon);
//     };

//     fetchPrevious();
//     checkNoonReset();

//     return () => unsubCurrent();
//   }, []);

//   const today = new Date().toLocaleDateString('en-IN', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   const getDiff = (current, previous) => {
//     if (showDiffZero) return 0;
//     return current - previous;
//   };

//   const getDiffElement = (current, previous) => {
//     const diff = getDiff(current, previous);
//     const isUp = diff > 0;
//     const isZero = diff === 0;

//     return (
//       <span
//         className={`ml-2 text-sm font-semibold ${
//           isZero ? 'text-gray-400' : isUp ? 'text-green-600' : 'text-red-600'
//         }`}
//       >
//         {isZero ? '0' : `${diff > 0 ? '+' : ''}${diff} ${isUp ? '▲' : '▼'}`}
//       </span>
//     );
//   };

//   if (loading || !currentRates || !previousRates) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 to-white">
//         <p className="text-gray-600 text-lg">Loading gold rates...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-white to-yellow-50 p-4 pt-12">
//       <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-yellow-300 p-6 sm:p-8 text-center">

//         {/* Title */}
//         <h1 className="text-3xl sm:text-5xl font-extrabold text-yellow-600 mb-4">
//           Today's Gold Rates
//         </h1>

//         {/* Date */}
//         <p className="inline-block bg-yellow-200 text-yellow-800 text-sm sm:text-base font-semibold px-4 py-1 rounded-full mb-8 shadow">
//           {today}
//         </p>

//         {/* Rates Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

//           {/* 22K Rate */}
//           <div className="rounded-2xl bg-yellow-50 p-5 sm:p-6 shadow-md border-2 border-yellow-400 hover:shadow-lg transition transform hover:scale-105">
//             <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-3">22K Gold</h2>
//             <p className="text-lg sm:text-xl font-semibold text-gray-800">
//               1 gram: ₹{currentRates['22K']}
//               {getDiffElement(currentRates['22K'], previousRates['22K'])}
//             </p>
//             <p className="text-lg sm:text-xl font-semibold text-gray-800">
//               8 grams: ₹{currentRates['22K'] * 8}
//               {getDiffElement(currentRates['22K'] * 8, previousRates['22K'] * 8)}
//             </p>
//           </div>

//           {/* 24K Rate */}
//           <div className="rounded-2xl bg-yellow-50 p-5 sm:p-6 shadow-md border-2 border-yellow-400 hover:shadow-lg transition transform hover:scale-105">
//             <h2 className="text-2xl sm:text-3xl font-bold text-yellow-700 mb-3">24K Gold</h2>
//             <p className="text-lg sm:text-xl font-semibold text-gray-800">
//               1 gram: ₹{currentRates['24K']}
//               {getDiffElement(currentRates['24K'], previousRates['24K'])}
//             </p>
//             <p className="text-lg sm:text-xl font-semibold text-gray-800">
//               8 grams: ₹{currentRates['24K'] * 8}
//               {getDiffElement(currentRates['24K'] * 8, previousRates['24K'] * 8)}
//             </p>
//           </div>
//         </div>

//         {/* Back Button */}
//         <div className="mt-10 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-yellow-600 shadow transition"
//           >
//             ← Back to Home
//           </button>
//         </div>

//         {/* Footer Note */}
//         <p className="text-xs sm:text-sm text-gray-500 mt-8 italic">
//           * Rates reset after 12 PM. Prices are indicative and may vary slightly by location.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Rates;



// ----------------------------------------------


// import React from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase";

// export default function Admin() {
//   const addMenuItem = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "cafeMenu"), {
//         preparationTime: 7,
//         description: "A rich and creamy coffee drink with a smooth finish.",
//         image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
//         ingredients: [
//           "Bread",
//           "Milk",
//           "Cofee powder",
//           "Water",
//           "Cucumber",
//           "Banana"
//         ],
//         name: "Cappuccino",
//         price: 120
//       });
//       alert(`Menu item added with ID: ${docRef.id}`);
//     } catch (error) {
//       console.error("Error adding menu item: ", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Admin - Add Menu Item</h1>
//       <button
//         onClick={addMenuItem}
//         className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Add Cappuccino
//       </button>
//     </div>
//   );
// }

