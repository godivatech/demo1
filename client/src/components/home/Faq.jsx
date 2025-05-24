import { useState } from "react";
import { Link } from "wouter";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="font-montserrat font-semibold text-lg">
          {faq.question}
        </h3>
        <i
          className={cn(
            "fas fa-plus text-primary transition-transform",
            isOpen && "transform rotate-45"
          )}
        ></i>
      </button>
      <div
        className={cn(
          "p-5 pt-0 transition-all",
          isOpen ? "block opacity-100" : "hidden opacity-0"
        )}
      >
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              FAQs
            </p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            Common <span className="text-primary">Building Problems</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answers to frequently asked questions about building issues and our
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {FAQS.slice(0, 3).map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>

          <div className="space-y-6">
            {FAQS.slice(3, 6).map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Contact Our Experts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Faq;
