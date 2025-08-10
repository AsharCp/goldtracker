import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

// A reusable card component to display order details
const OrderCard = ({ order, statusColor, actionButton }) => (
  <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] transform ${statusColor} text-white flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0`}>
    {/* Order Details */}
    <div className="flex-1">
      <h2 className="text-2xl font-extrabold tracking-wide">{order.name}</h2>
      <p className="text-sm italic opacity-80 mt-1">
        Excluded: {order.excludedIngredients?.length > 0 ? order.excludedIngredients.join(", ") : "None"}
      </p>
      <p className="text-lg font-bold mt-2">Status: {order.status}</p>
    </div>
    
    {/* Action button container */}
    {actionButton && (
      <div className="md:self-center">
        {actionButton}
      </div>
    )}
  </div>
);

// Main Summary component
export default function Summary() {
  const [orders, setOrders] = useState([]);
  const [servedOrders, setServedOrders] = useState(new Set());
  const [servedMessageIds, setServedMessageIds] = useState(new Set());

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const markServed = async (id) => {
    // Update Firestore status to "Purchased"
    await updateDoc(doc(db, "orders", id), { status: "Purchased" });
    
    // Update local served state
    setServedOrders(prev => new Set(prev).add(id));
    
    // Show served message temporarily
    setServedMessageIds(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    
    setTimeout(() => {
      setServedMessageIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 3000);
  };
  
  // Adjust filters to reflect new status "Purchased"
  const pendingOrders = orders.filter(o => o.status !== "Food is Ready" && o.status !== "Purchased");
  const completedOrders = orders.filter(o => o.status === "Food is Ready" || o.status === "Purchased");

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight">
            Order Summary
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Stay on top of all pending and completed orders.
          </p>
        </div>

        {/* Pending Orders Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
            Pending Orders ⌛
          </h2>
          <div className="grid gap-6">
            {pendingOrders.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 text-lg">
                <p>No pending orders at the moment. Time for a break! ☕</p>
              </div>
            ) : (
              pendingOrders.map(order => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  statusColor="bg-red-500"
                  actionButton={null}
                />
              ))
            )}
          </div>
        </section>

        {/* Completed Orders Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
            Completed Orders ✅
          </h2>
          <div className="grid gap-6">
            {completedOrders.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500 text-lg">
                <p>No completed orders yet. Let's get cooking! 🧑‍🍳</p>
              </div>
            ) : (
              completedOrders.map(order => {
                const isServed = servedOrders.has(order.id) || order.status === "Purchased";
                const showMessage = servedMessageIds.has(order.id);
                
                const statusColor = isServed ? "bg-sky-500" : "bg-green-500";
                
                return (
                  <OrderCard
                    key={order.id}
                    order={order}
                    statusColor={statusColor}
                    actionButton={!isServed && (
                      <button
                        onClick={() => markServed(order.id)}
                        className="bg-sky-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-600 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                      >
                        Served
                      </button>
                    )}
                  >
                    {/* Additional content for completed orders */}
                    {showMessage && (
                      <div className="absolute top-4 right-4 bg-white text-green-600 font-bold px-4 py-2 rounded-full shadow-md animate-fade-in-down">
                        Food is served!
                      </div>
                    )}
                  </OrderCard>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}