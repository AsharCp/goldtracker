import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
  const [rate22, setRate22] = useState('');
  const [rate24, setRate24] = useState('');
  const [status, setStatus] = useState('');
  const [clickCount, setClickCount] = useState(0);

  // Realtime listener for click count
  useEffect(() => {
    const ref = doc(db, 'clickStats', 'homeClicks');
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        setClickCount(docSnap.data().count || 0);
      }
    });

    return () => unsub();
  }, []);

  const handleUpdate = async () => {
    try {
      const currentRef = doc(db, 'goldRates', 'current');
      const previousRef = doc(db, 'goldRates', 'previous');

      // Move current values to 'previous'
      const currentSnap = await getDoc(currentRef);
      if (currentSnap.exists()) {
        await setDoc(previousRef, currentSnap.data());
      }

      // Update new values to 'current'
      await updateDoc(currentRef, {
        '22K': parseFloat(rate22),
        '24K': parseFloat(rate24),
      });

      setStatus('✅ Gold rates updated successfully!');
      alert('✅ Gold rates updated successfully!');
    } catch (error) {
      console.error('Error updating rates:', error);
      setStatus('❌ Failed to update rates. Please try again.');
      alert('❌ Failed to update rates. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 pt-12 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-md">
        {/* Page Visit Count */}
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-gray-700">Total Page Visits</p>
          <p className="text-2xl font-bold text-yellow-600">{clickCount}</p>
        </div>

        <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">Update Gold Rates</h2>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">22K Gold Rate (1 gram)</label>
          <input
            type="number"
            value={rate22}
            onChange={(e) => setRate22(e.target.value)}
            className="w-full border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500"
            placeholder="Enter 22K rate"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">24K Gold Rate (1 gram)</label>
          <input
            type="number"
            value={rate24}
            onChange={(e) => setRate24(e.target.value)}
            className="w-full border border-yellow-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-yellow-500"
            placeholder="Enter 24K rate"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition"
        >
          Update Rates
        </button>

        {status && (
          <p className="text-sm mt-3 text-center text-gray-600">{status}</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
