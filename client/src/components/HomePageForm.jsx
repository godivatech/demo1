import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, User, Phone, Mail, MessageSquare, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

const HomePageForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    message: "",
    address: "",
  });
  const { toast } = useToast();

  // Issue types for building problems
  const issueTypes = [
    "Leaking Roof",
    "Wall Cracks",
    "Dampness/Seepage",
    "Structural Damage",
    "Water Tank Leakage",
    "Bathroom Waterproofing",
    "Other Issues"
  ];

  useEffect(() => {
    // Show the form after a short delay when the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIssueSelect = (issue) => {
    setFormData((prev) => ({ ...prev, issueType: issue }));
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.issueType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/inquiries", formData);
      
      // Reset form and show success
      setFormData({
        name: "",
        email: "",
        phone: "",
        issueType: "",
        message: "",
        address: "",
      });
      
      toast({
        title: "Inquiry submitted!",
        description: "Our team will contact you shortly.",
      });
      
      // Invalidate any inquiries cache to refresh admin panel
      queryClient.invalidateQueries(["inquiries"]);
      
      // Close form
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Failed to submit",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex justify-between items-center">
              <h2 className="text-white font-bold text-lg">Building Doctor Consultation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              {currentStep === 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <HelpCircle size={18} className="text-white mr-2" />
                    What issue are you facing?
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {issueTypes.map((issue) => (
                      <button
                        key={issue}
                        className="bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-sm font-medium transition-colors text-left border border-orange-200 hover:border-orange-300"
                        onClick={() => handleIssueSelect(issue)}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                  
                  {/* Skip to contact form button */}
                  <button
                    className="w-full text-sm text-gray-500 hover:text-orange-600 mt-2"
                    onClick={() => setCurrentStep(1)}
                  >
                    Skip to contact form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {formData.issueType ? (
                      <div className="flex items-center justify-between">
                        <span>Let us fix your {formData.issueType}</span>
                        <button
                          type="button"
                          className="text-xs text-orange-600 hover:text-orange-700"
                          onClick={() => setCurrentStep(0)}
                        >
                          Change issue
                        </button>
                      </div>
                    ) : (
                      "Contact Information"
                    )}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        className="pl-10"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        className="pl-10"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email (Optional)"
                        className="pl-10"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Property Address (Optional)"
                        className="pl-10"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <Textarea
                        name="message"
                        placeholder="Describe your issue in detail (Optional)"
                        className="pl-10 pt-2 min-h-[100px]"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Request Free Consultation
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      We'll contact you soon to discuss your building issues and provide expert solutions.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePageForm;