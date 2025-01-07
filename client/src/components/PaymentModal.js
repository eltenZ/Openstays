import { X, Check, CreditCard, Phone, Mail, User } from "lucide-react";
import React, { useState } from "react";

const baseStyles = {
  fontFamily: "'Inter', sans-serif",
};

export default function PaymentModal({ bookingItems, closeModal }) {
  const [invoiceId, setInvoiceId] = useState("");  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

//logic to generate unique invoice id
 	const generateInvoiceId = () => {
  const timestamp = Date.now(); // Unique timestamp
  const randomDigits = Math.floor(Math.random() * 90000) + 10000; // 5 random digits
  return `INV-${timestamp}-${randomDigits}`;
};

 //call generate invoice function and store invoice state
const handleGenerateInvoice = () => {
  const newInvoiceId = generateInvoiceId();
  setInvoiceId(newInvoiceId);
};

  // Calculate total amount and required deposit
  const totalAmount = bookingItems.reduce((sum, item) => sum + item.price * (item.nights || 1), 0);
  const requiredDeposit = totalAmount * 0.5;

 

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

//API to post reservations
const sendReservation = async () => {
  const reservationData = {
    customerInfo: {
      name: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
    },
    bookingItems: bookingItems.map(item => ({
      name: item.name,
      price: item.price,
      nights: item.nights || 1,
    })),
    totalAmount: totalAmount,
    invoiceId: invoiceId,
  };

  try {
    const response = await fetch("http://192.168.235.93:5000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error("Failed to send reservation");
    }

    const result = await response.json();
    alert(`Reservation sent successfully! Reservation ID: ${result.reservationId}`);
  } catch (error) {
    console.error("Error sending reservation:", error);
    alert("Failed to send reservation. Please try again.");
  }
};

  if (showConfirmation) {
    return (
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        style={baseStyles}
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative  shadow-lg transition-all">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Invoice</h2>
            <button
              onClick={() => setShowConfirmation(false)}
              className="transition-colors hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="text-blue-600 h-5 w-5" />
                <p className="text-blue-600 font-medium">Pending Payment</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Invoice Ref:
              </p>
              <p className="font-mono text-lg">{invoiceId}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-3">Customer Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span>{customerInfo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{customerInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{customerInfo.phone}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Reservation Details</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {bookingItems.map((item) => (
                  <li key={item.id}>
                    {item.name}  
                  </li>
                ))}
              </ul>
            </div>

	    <div className="mt-4">
              <p className="text-sm font-medium">
                <span className="text-gray-700">Total Cost:</span> Kes {totalAmount.toLocaleString()}
              </p>
              <p className="text-sm font-medium">
                <span className="text-gray-700">Deposit Paid:</span> Kes {requiredDeposit.toLocaleString()}
              </p>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Note: All reservations remain tentative until 50% deposit is paid.
            </p>
	 <h3 className="font-medium mb-2">Payment advice:</h3>
	 <p className="text-sm mb-2">Mpesa Till: 123456</p>
	
            <button
  onClick={async () => {
    await sendReservation(); // Call the API
    closeModal(); // Close the modal after sending
  }}
  className="w-full mt-4 py-3 bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
>
  Send via WhatsApp
</button>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      style={baseStyles}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative transition-all shadow-lg">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Complete Reservation</h2>
          <button onClick={closeModal}>
  <X className="h-6 w-6" />
</button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                value={customerInfo.name}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                value={customerInfo.email}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Mobile Number"
                name="phone"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                value={customerInfo.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Reservation Summary</h3>
            <div className="space-y-2 text-sm">
              {bookingItems.map((item) => (
                <div className="flex justify-between" key={item.id}>
                  <span>
                    {item.name} - {item.nights} Qty(nights)
                  </span>
                  <span>KES {item.price * (item.nights || 1)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>KES {totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Required Deposit (50%)</span>
              <span>KES {requiredDeposit}</span>
            </div>
          </div>

          <button
            onClick={async () => {
  await handleGenerateInvoice(); // Generate the invoice id
  setShowConfirmation(true); // Show the confirmation modal after the invoice is generated
}}
            className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
