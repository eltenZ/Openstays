import React from "react";
import { Trash2 } from "lucide-react";

const Bookings = ({ items, removeItem, openPaymentModal }) => {
  const totalCost = items.reduce((sum, item) => sum + item.price * (item.nights || 1), 0);

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col justify-between">
      {items.length > 0 ? (
        <>
          <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-[#1a365d] mb-4">Your Bookings</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Kes {item.price.toLocaleString()}
                    </p>
                    {item.nights && <p className="text-sm text-gray-600">{item.nights} Qty/nights</p>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      Kes {(item.price * (item.nights || 1)).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>Kes {totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={openPaymentModal} // Trigger the payment modal
            className="mt-4 w-full py-3 bg-[#1a365d] text-white font-semibold rounded-lg hover:bg-[#163059] transition"
          >
            Proceed to Pay
          </button>
        </>
      ) : (
        <p className="text-gray-600 text-center mt-8">No bookings yet.</p>
      )}
    </div>
  );
};

export default Bookings;
