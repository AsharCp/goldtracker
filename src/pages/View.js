import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [excludedItems, setExcludedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, "cafeMenu", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchItem();
  }, [id]);

  const toggleExclude = (ingredient) => {
    setExcludedItems((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleOrder = async () => {
    const orderRef = await addDoc(collection(db, "orders"), {
      name: item.name,
      image: item.image,
      excludedIngredients: excludedItems,
      quantity,
      status: "Cooking", // default status
    });

    navigate(`/summary`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  const totalPrice = item.price * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold">Item Details</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Price Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-xl font-bold">₹{item.price}</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Title and Description */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{item.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
            </div>

            {/* Preparation Time */}
            <div className="flex items-center bg-amber-50 p-4 rounded-xl">
              <svg className="w-6 h-6 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-semibold text-gray-800">
                Preparation Time: {item.preparationTime} mins
              </span>
            </div>

            {/* Ingredients Section */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Customize Your Order
                </h2>
                <p className="text-gray-600 mb-4">Click to exclude ingredients you don't want:</p>
                <div className="flex flex-wrap gap-3">
                  {item.ingredients.map((ingredient, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleExclude(ingredient)}
                      className={`px-4 py-2 rounded-full border-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                        excludedItems.includes(ingredient)
                          ? "bg-red-500 text-white border-red-500 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-amber-500 hover:text-amber-600"
                      }`}
                    >
                      {excludedItems.includes(ingredient) && (
                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                      {ingredient}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quantity</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-white rounded-full shadow-md">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                    disabled={quantity <= 1}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="mx-6 text-xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={increaseQuantity}
                    className="p-3 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-gray-600">Total Price</p>
                  <p className="text-3xl font-bold text-amber-600">₹{totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
            >
              <svg className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Order - ₹{totalPrice}
            </button>
          </div>
        </div>

        {/* Excluded Items Summary */}
        {excludedItems.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Items to be excluded from your order:
            </h3>
            <div className="flex flex-wrap gap-2">
              {excludedItems.map((item, idx) => (
                <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}