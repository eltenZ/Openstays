import React, { useState } from "react";

const FAQ = ({ faqs }) => {
  // Default FAQ items if none are passed as props.
  const defaultFaqs = [
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel up to 24 hours before your check-in for a full refund.",
    },
    {
      question: "Are pets allowed?",
      answer: "Unfortunately, no pets are allowed in this accommodation.",
    },
    {
      question: "Is parking available?",
      answer: "Yes, free parking is available on-site for all guests.",
    },
  ];

  const faqList = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqList.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center focus:outline-none"
            >
              <span className="text-gray-800 font-medium">{item.question}</span>
              <span className="text-gray-600">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
