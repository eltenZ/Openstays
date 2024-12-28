import {
  Menu,
  X,
  Search,
  Home,
  Calendar,
  MoreVertical,
  ChevronDown,
  Filter,
  Edit,
  Trash,
  MapPin,
  Plus,
  Settings
} from "lucide-react";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("reservations");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchlist, setSearchlist] = useState("");
  
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
 const [reservations, setReservations] = useState([]);

useEffect(() => {
  async function fetchReservations() {
    const response = await fetch("http://192.168.24.100:5000/api/reservations");
    const data = await response.json();
    setReservations(data);
  }
  fetchReservations();
}, []);


const [listings, setListings] = useState([]);

useEffect(() => {
  async function fetchListings() {
    const response = await fetch("http://192.168.24.100:5000/api/listings");
    const data = await response.json();
    setListings(data);
  }
  fetchListings();
}, []);

// Search and filter logic for listings

 const filteredListings = listings.filter((listing) => {
const matchesSearchlist = (listing.title || "").toLowerCase
().includes((searchlist || "").toLowerCase());
    if (!matchesSearchlist) return false;
    if (activeCategory === "All") return true;
    return listing.category === activeCategory;
  });

// Search and filter logic for reservations
  const filteredReservations = reservations.filter((reservation) => {
const matchesSearch = (reservation.guest || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    if (!matchesSearch) return false;
    if (activeStatus === "All") return true;
    return reservation.status === activeStatus;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 rounded-md hover:bg-gray-100 min-h-[44px] min-w-[44px]"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className="flex items-center">
                
                <span className="ml-2 text-lg sm:text-xl font-semibold text-gray-900">
                  Openstays Admin
                </span>
              </div>
	
	<button className="absolute right-16 sm:hidden p-2 rounded-md text-blue-600 hover:bg-gray-100 min-h-[44px] min-w-[44px]"	
	aria-label="Add listings">
<Plus size={26} />
	</button>
	

<button className="absolute right-4 sm:hidden p-2 rounded-md text-blue-600 hover:bg-gray-100 min-h-[44px] min-w-[44px]"
 aria-label="Settings">
<Settings size={24} />
        </button>
            </div>

            <nav className="hidden sm:flex space-x-8">
              {["reservations", "listings", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/20 z-[55]"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              className="sm:hidden fixed w-full bg-white z-[60] top-14 shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["reservations", "listings", "analytics"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${activeTab === tab ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "reservations" && (
          <div className="mt-2">
            <div className="sticky top-14 sm:top-16 bg-gray-50 pt-2 pb-4 z-40">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search reservations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2 border rounded-lg min-h-[44px]"
                  />
                  <Search className="absolute left-3 top-3.5 sm:top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex space-x-2 w-full overflow-x-auto no-scrollbar py-2">
                  {["All", "Pending", "Confirmed", "Closed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                        ${activeStatus === status ? "bg-blue-100 text-blue-700 border-2 border-blue-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      onClick={() => setSelectedReservation(reservation)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.guest}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reservation.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.invoiceNunber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reservation.bookingDate).toLocaleDateString()} -{" "}
                        
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4 mt-4">
              {filteredReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  onClick={() => setSelectedReservation(reservation)}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {reservation.guest}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {reservation.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {reservation.status}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-sm text-gray-700 mb-1">
                      {reservation.invoiceNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                     Booked on: {new Date(reservation.bookingDate).toLocaleDateString()} -{" "}
                     
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    <span className="font-medium text-gray-900">
                      {reservation.total}
                    </span>
<span className="font-medium text-blue-900">
                      {reservation.amountPaid}
                    </span>
                    <button className="p-2 min-h-[44px] min-w-[44px] text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "listings" && (

   <>       
            <div className="sticky top-14 sm:top-16 bg-gray-50 pt-2 pb-4 z-40">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchlist}
                    onChange={(e) => setSearchlist(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2 border rounded-lg min-h-[44px]"
                  />
                  <Search className="absolute left-3 top-3.5 sm:top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="flex space-x-2 w-full overflow-x-auto no-scrollbar py-2">
                  {["All", "Stays", "Trips", "Picnics"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                        ${activeCategory === category ? "bg-blue-100 text-blue-700 border-2 border-blue-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>


          <div className="mt-8 space-y-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`${process.env.PUBLIC_URL}/${listing.image.split(',')[0].trim()}`}
                    alt={listing.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {listing.location} • {listing.price}
                    </p>
                    <span className="inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {listing.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-gray-50">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50">
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
</>
        )}
      </main>

      <AnimatePresence>
        {selectedReservation && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
            onClick={() => setSelectedReservation(null)}
          >
            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full sm:max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-medium text-gray-900">
                  Reservation Details
                </h3>
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="p-3 text-gray-400 hover:text-gray-500 min-h-[44px] min-w-[44px]"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-4 sm:px-6 py-4">
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Guest</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedReservation.guest}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Contact
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedReservation.email}
                      <br />
                      {selectedReservation.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Invoice ref:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedReservation.invoiceNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Booked on</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(
                        selectedReservation.bookingDate,
                      ).toLocaleDateString()}{" "}
                      
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedReservation.total}
                    </dd>
                  </div>
                </dl>
              </div>

{/* Reservation Items */}
<div className="mb-6 px-4"> {/* Adds padding to leave space on both sides */}
  <h2 className="text-xl font-semibold text-[#1a202c] mb-4">Reservation Items</h2>

  {selectedReservation.items.length > 0 ? (
    <div className="mt-4 space-y-4">
      {selectedReservation.items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-2xl shadow-sm p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium text-blue-600">{item.description}</h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" /> {item.location || "Accommodation"}
            </p>
          </div>
          <div className="text-right absolute bottom-4 right-4">
            <span className="font-medium text-gray-800">
              Total: Kes {(item.cost * item.quantity).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm text-gray-600">No items found for this reservation.</p>
  )}
</div>
              <div className="px-4 sm:px-6 py-4">
                <dl className="grid grid-cols-1 gap-4">
                  <div className="border-t border-gray-200 mt-6 pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">
                      Status Management
                    </h4>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        Current Status:
                      </span>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedReservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {selectedReservation.status}
                      </span>
                    </div>

                    {selectedReservation.status !== "Closed" && (
                      <button
                        onClick={() => setShowStatusForm(true)}
                        className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
                      >
                        Change to{" "}
                        {selectedReservation.status === "Pending"
                          ? "Confirmed"
                          : "Closed"}
                      </button>
                    )}
                  </div>

                  {selectedReservation.statusHistory && (
                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">
                        Status History
                      </h4>
                      <div className="space-y-4">
                        {selectedReservation.statusHistory.map(
                          (history, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex justify-between text-gray-500">
                                <span>
                                  {new Date(
                                    history.timestamp,
                                  ).toLocaleDateString()}
                                </span>
                                <span>Kes {history.amount}</span>
                              </div>
                              <div className="mt-1">
                                <span className="text-gray-700">
                                  {history.from}
                                </span>
                                <span className="text-gray-500"> → </span>
                                <span className="text-gray-700">
                                  {history.to}
                                </span>
                              </div>
                              <p className="mt-1 text-gray-500">
                                {history.details}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex justify-end sticky bottom-0">
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="px-4 py-3 sm:py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 min-h-[44px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStatusForm && (
          <motion.div
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="px-4 py-3 border-b sticky top-0 bg-white flex items-center justify-between">
              <h3 className="text-lg font-medium">Update Status</h3>
              <button onClick={() => setShowStatusForm(false)} className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-sm">
                <span className="text-gray-500">Changing status from </span>
                <span className="font-medium">
                  {selectedReservation.status}
                </span>
                <span className="text-gray-500"> to </span>
                <span className="font-medium">
                  {selectedReservation.status === "Pending"
                    ? "Confirmed"
                    : "Closed"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Details
                  </label>
                  <textarea
                    value={transactionDetails}
                    onChange={(e) => setTransactionDetails(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Enter transaction details or notes"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t sticky bottom-0 bg-white">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowStatusForm(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!amount || !transactionDetails) return;
                    const nextStatus =
                      selectedReservation.status === "Pending"
                        ? "Confirmed"
                        : "Closed";
                    const updatedReservation = {
                      ...selectedReservation,
                      status: nextStatus,
                      statusHistory: [
                        ...(selectedReservation.statusHistory || []),
                        {
                          from: selectedReservation.status,
                          to: nextStatus,
                          amount: parseFloat(amount),
                          details: transactionDetails,
                          timestamp: new Date().toISOString(),
                        },
                      ],
                    };
                    // Update reservation in list
                    const updatedReservations = reservations.map((r) =>
                      r.id === selectedReservation.id ? updatedReservation : r,
                    );
                    setReservations(updatedReservations);
                    setSelectedReservation(updatedReservation);
                    setAmount("");
                    setTransactionDetails("");
                    setShowStatusForm(false);
                  }}
                  disabled={!amount || !transactionDetails}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
render(<AdminPanel />, document.getElementById("root"));

