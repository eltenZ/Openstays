import React from 'react';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';

export class PaymentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showPaymentModal: true });
  }

  closeModal() {
    this.setState({ showPaymentModal: false });
  }

  render() {
    const { showPaymentModal } = this.state;
    const groupMembers = [
      { name: 'Mwangi', status: 'paid', amount: 'KES 11,250' },
      { name: 'Amina', status: 'paid', amount: 'KES 11,250' },
      { name: 'Juma', status: 'pending', amount: 'KES 11,250' },
      { name: 'Karanja', status: 'pending', amount: 'KES 11,250' },
    ];

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5">
          <h2 className="text-lg font-medium mb-4">Payment Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Cost</span>
              <span className="font-medium">KES 45,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your Share</span>
              <span className="font-medium">KES 11,250</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status</span>
              <span className="text-green-600 font-medium flex items-center">
                <CheckCircle size={16} className="mr-1" />
                Paid
              </span>
            </div>
            <div className="pt-2">
              <button
                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={this.openModal}
              >
                <DollarSign size={16} className="mr-2" />
                Pay Your Share
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-5">
          <h3 className="font-medium mb-3">Group Payment Status</h3>
          <div className="space-y-2">
            {groupMembers.map((member, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    {member.name.charAt(0)}
                  </span>
                  <span>{member.name}</span>
                </div>
                <div className="flex items-center">
                  <span
                    className={`text-sm ${
                      member.status === 'paid'
                        ? 'text-green-600'
                        : 'text-orange-500'
                    }`}
                  >
                    {member.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {member.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-5">
              <h3 className="text-lg font-medium mb-4">Pay with M-Pesa</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0712 345 678"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Amount
                  </label>
                  <input
                    type="text"
                    value="KES 11,250"
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={this.closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                    onClick={this.closeModal}
                  >
                    <CreditCard size={16} className="mr-2" />
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
