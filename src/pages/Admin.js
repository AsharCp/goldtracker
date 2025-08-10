import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

// A reusable component for displaying a single order card
const OrderCard = ({ order, children, cardColorClass, statusColorClass }) => (
  <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] transform ${cardColorClass} text-gray-900 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0`}>
    <div className="flex-1">
      <h2 className="text-2xl font-extrabold tracking-wide">{order.name}</h2>
      <p className="text-sm italic opacity-80 mt-1">
        Customer: {order.customerId}
      </p>
      <p className="text-sm font-semibold mt-1 text-red-600">
        Excluded: {order.excludedIngredients?.length > 0
          ? order.excludedIngredients.join(", ")
          : "None"}
      </p>
      <p className={`text-lg font-bold mt-2 ${statusColorClass}`}>
        Status: {order.status}
      </p>
    </div>
    {children}
  </div>
);

// Main Admin component
export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const markReady = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "Food is Ready" });
    setSuccessMessage("Order status updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Filter orders:
  // Pending orders only include those with status "Cooking"
  const pendingOrders = orders.filter(o => o.status === "Cooking");
  // Completed orders include all orders that are NOT "Cooking"
  const completedOrders = orders.filter(o => o.status !== "Cooking");

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
            Admin Dashboard 📋
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Manage all customer orders in one place.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg animate-fade-in-down" role="alert">
            <p className="font-bold">Success!</p>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Pending Orders Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2 flex items-center gap-2">
            Pending Orders <span className="text-orange-500">⏳</span>
          </h2>
          <div className="grid gap-6">
            {pendingOrders.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 text-lg">
                <p>No new orders to cook! Take a break. 🧘</p>
              </div>
            ) : (
              pendingOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  cardColorClass="bg-white"
                  statusColorClass="text-red-500"
                >
                  <button
                    onClick={() => markReady(order.id)}
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 md:mt-0"
                  >
                    Cooking Finished
                  </button>
                </OrderCard>
              ))
            )}
          </div>
        </section>

        {/* Completed Orders Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2 flex items-center gap-2">
            Completed Orders <span className="text-green-500">✅</span>
          </h2>
          <div className="grid gap-6">
            {completedOrders.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 text-lg">
                <p>No orders have been completed yet. Let's get cooking! 🧑‍🍳</p>
              </div>
            ) : (
              completedOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  cardColorClass={
                    order.status === "Food is Ready" ? "bg-green-100" : "bg-yellow-100"
                  }
                  statusColorClass={
                    order.status === "Food is Ready" ? "text-green-600" : "text-yellow-700"
                  }
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
