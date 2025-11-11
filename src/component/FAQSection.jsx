import { useContext, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import faqImage from "../assets/img2.png";
import ThemeContext from "../ThemeContext/ThemeContext";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I pay my utility bills through this platform?",
      answer:
        "Simply log in to your account, select the bill category, enter your details, and complete the payment securely within seconds.",
    },
    {
      question: "Can I view my previous bill payment history?",
      answer:
        "Yes, you can check your payment history anytime from the ‘Recent Bills’ or ‘History’ section on your dashboard.",
    },
    {
      question: "Is my personal information safe here?",
      answer:
        "Absolutely. All user data is encrypted, and payments are processed securely with trusted payment gateways.",
    },
    {
      question: "What if my payment fails?",
      answer:
        "If your payment fails, you’ll be notified instantly. You can retry or contact our support team for assistance.",
    },
  ];

  return (
    <section
      className={`py-16 px-6 md:px-16 ${
        darkMode
          ? "bg-linear-to-r from-gray-950 via-gray-900 to-gray-950  text-white"
          : " text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side Image */}
        <div className="flex justify-center">
          <img
            src={faqImage}
            alt="FAQ illustration"
            className="w-10/12 md:w-11/12 lg:w-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side FAQ */}
        <div>
          <h2
            className={`text-3xl font-bold mb-8 ${
              darkMode ? "text-orange-400" : "text-blue-700"
            }`}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-lg focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <FiMinus
                      className={`text-xl ${
                        darkMode ? "text-orange-400" : "text-blue-600"
                      }`}
                    />
                  ) : (
                    <FiPlus
                      className={`text-xl ${
                        darkMode ? "text-orange-400" : "text-blue-600"
                      }`}
                    />
                  )}
                </button>

                {/* Answer Section */}
                <div
                  className={`px-6 pb-4 transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
