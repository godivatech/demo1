import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { FAQS } from "../../data/company";

/**
 * FAQ Item component
 * @param {Object} props - Component props
 * @param {import('../../data/schema').Faq} props.faq - FAQ data
 */
const FaqItem = ({ faq }) => {
  return (
    <AccordionItem value={`item-${faq.id}`} className="border-none">
      <AccordionTrigger className="text-left font-medium text-gray-900 py-4 px-4 rounded-lg hover:bg-gray-50 hover:no-underline data-[state=open]:bg-gray-50">
        {faq.question}
      </AccordionTrigger>
      <AccordionContent className="text-gray-600 pt-2 pb-4 px-4">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  );
};

/**
 * FAQ section component
 */
const FaqSection = () => {
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to common questions about our building repair services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-4">
              Couldn't find an answer to your question?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent 
              text-base font-medium rounded-md shadow-sm text-white bg-orange-600 
              hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-orange-500"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;