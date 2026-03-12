// src/components/dashboard/PaymentCard.js
import React from "react";
import { CreditCard, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export class PaymentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      isSubmitted: false,
      formData: {
        fullName: "",
        email: "",
        phone: "",
        adults: 2,
        children: 0,
        budget: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [name]: value,
      },
    }));
  };

  updateGuests = (type, operation) => {
    this.setState((prev) => {
      const currentValue = prev.formData[type];

      let newValue = currentValue;

      if (operation === "add") {
        newValue = currentValue + 1;
      } else if (operation === "subtract") {
        newValue = Math.max(type === "adults" ? 1 : 0, currentValue - 1);
      }

      return {
        formData: {
          ...prev.formData,
          [type]: newValue,
        },
      };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { booking } = this.props;
    const { formData } = this.state;

    if (!booking) return;

    // Prepare email template parameters
    const templateParams = {
      accommodation: booking.name,
      location: booking.location,
     dates: booking.dates || `${booking.checkIn.toDateString()} – ${booking.checkOut.toDateString()}`,
      nights: booking.nights,
      total: booking.price * booking.nights,

      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      adults: formData.adults,
      children: formData.children,
      budget: formData.budget || "Not specified",
    };

    // Send email via EmailJS
    emailjs
      .send(
        "service_8salo56",
        "template_slghp8q",
        templateParams,
        "rYb5o7Vbb7_JHff7R"
      )
      .then(
        () => {
          this.setState({ isSubmitted: true });
        },
        (error) => {
          console.error("Email failed:", error);
          alert(
            "Failed to send reservation request. Please try again later."
          );
        }
      );
  };

  render() {
    const { booking } = this.props;
    const { isExpanded, isSubmitted, formData } = this.state;

    if (!booking) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-lg font-medium mb-2">Reservation</h3>
          <p className="text-gray-500">No booking selected.</p>
        </div>
      );
    }

    const totalAmount = booking.price * booking.nights;

    // SUCCESS SCREEN
    if (isSubmitted) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-3" size={32} />

          <h3 className="text-lg font-semibold mb-2">Request Sent</h3>

          <p className="text-gray-500 mb-4">
            Thank you {formData.fullName.split(" ")[0] || "Guest"}. We have
            received your reservation request and will confirm availability
            with the host shortly.
          </p>


        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center gap-2">
          <CreditCard size={18} />
          <h3 className="text-lg font-medium">Reservation</h3>
        </div>

        {/* Total */}
        <div className="flex justify-between border-b pb-3">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">
            KES {totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Reservation Terms */}
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium text-gray-800">Reservation Terms</p>

          <ul className="list-disc list-inside space-y-1">
            <li>50% deposit required to confirm booking</li>
            <li>Balance payable before check-in</li>
            <li>Reservation subject to host availability</li>
          </ul>
        </div>

        {/* Request Button */}
        {!isExpanded && (
          <button
            onClick={() => this.setState({ isExpanded: true })}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Request Reservation
          </button>
        )}

        {/* FORM */}
        {isExpanded && (
          <form onSubmit={this.handleSubmit} className="space-y-4">

            <h4 className="font-medium">Guest Details</h4>

            <input
              type="text"
              name="fullName"
              required
              placeholder="Full Name"
              value={formData.fullName}
              onChange={this.handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={this.handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={this.handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />

            {/* Guests */}
            <div className="border-t pt-4 space-y-4">

              <h4 className="font-medium">Guests</h4>

              {/* Adults */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Adults</p>
                  <p className="text-xs text-gray-500">13+ years</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => this.updateGuests("adults", "subtract")}
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>

                  <span>{formData.adults}</span>

                  <button
                    type="button"
                    onClick={() => this.updateGuests("adults", "add")}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Children</p>
                  <p className="text-xs text-gray-500">Under 12 years</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => this.updateGuests("children", "subtract")}
                    className="px-2 py-1 border rounded"
                  >
                    −
                  </button>

                  <span>{formData.children}</span>

                  <button
                    type="button"
                    onClick={() => this.updateGuests("children", "add")}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Preferred Budget */}
            <div className="border-t pt-4 space-y-2">

              <h4 className="font-medium">Preferred Budget (Optional)</h4>

              <p className="text-xs text-gray-500">
                If you have a preferred budget, you may indicate it for the
                host's consideration.
              </p>

              <input
                type="number"
                name="budget"
                placeholder="Your budget (KES)"
                value={formData.budget}
                onChange={this.handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Confirm Reservation
            </button>

          </form>
        )}
      </div>
    );
  }
}
