import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, User, Phone, Mail, MessageSquare, Home, CheckCircle, FilePlus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { contactSchema, inquirySchema } from "@/data/schema";

const HomePageForm = ({ isOpen: externalIsOpen, onClose }) => {
  // Use external isOpen prop if provided, otherwise use internal state
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("inquiry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Inquiry form data
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    message: "",
    address: "",
  });
  
  // Contact form data
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false
  });
  
  const { toast } = useToast();
  
  // Sync with external isOpen prop when it changes
  useEffect(() => {
    setIsOpen(externalIsOpen);
  }, [externalIsOpen]);

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
  
  // Service types for contact form
  const serviceTypes = [
    "Waterproofing",
    "Structural Repairs",
    "Sealants & Adhesives",
    "Waterproof Coatings",
    "Construction Chemicals",
    "Technical Consultation",
    "Other"
  ];

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleContactCheckboxChange = (checked) => {
    setContactData((prev) => ({ ...prev, consent: checked }));
  };
  
  const handleContactServiceChange = (value) => {
    setContactData((prev) => ({ ...prev, service: value }));
  };

  const handleIssueSelect = (issue) => {
    setInquiryData((prev) => ({ ...prev, issueType: issue }));
    setCurrentStep(1);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    
    // Validate form using Zod schema
    try {
      const validatedData = inquirySchema.parse(inquiryData);
      
      setIsSubmitting(true);
      await apiRequest("POST", "/api/inquiries", validatedData);
      
      // Reset form and show success
      setInquiryData({
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
      if (onClose) onClose();
    } catch (error) {
      if (error.errors) {
        // Zod validation error
        const errorMessages = error.errors.map(err => `${err.message}`).join(', ');
        toast({
          title: "Form validation error",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        // API or other error
        toast({
          title: "Failed to submit",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    } finally {
      if (isSubmitting) setIsSubmitting(false);
    }
  };
  
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form using Zod schema
    try {
      const validatedData = contactSchema.parse(contactData);
      
      setIsSubmitting(true);
      // Use the correct API endpoint: /api/contacts (not /api/contact)
      await apiRequest("POST", "/api/contacts", validatedData);
      
      // Reset form and show success
      setContactData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        consent: false
      });
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Invalidate any contacts cache to refresh admin panel
      queryClient.invalidateQueries(["contacts"]);
      
      // Close form
      setIsOpen(false);
      if (onClose) onClose();
    } catch (error) {
      if (error.errors) {
        // Zod validation error
        const errorMessages = error.errors.map(err => `${err.message}`).join(', ');
        toast({
          title: "Form validation error",
          description: errorMessages,
          variant: "destructive",
        });
      } else {
        // API or other error
        toast({
          title: "Failed to submit",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    } finally {
      if (isSubmitting) setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setIsOpen(false);
            if (onClose) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-[95%] sm:max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-white font-bold text-base sm:text-lg">
                {activeTab === "inquiry" ? "Building Doctor Consultation" : "Contact Us"}
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onClose) onClose();
                }}
                className="text-white hover:bg-white/20 rounded-full p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 sm:p-5">
              <Tabs defaultValue="inquiry" value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inquiry" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Quick Inquiry
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Contact Form
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="inquiry">
                  {currentStep === 0 ? (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <HelpCircle size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                        <span>What issue are you facing?</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mb-4">
                        {issueTypes.map((issue) => (
                          <button
                            key={issue}
                            className="bg-orange-50 hover:bg-orange-100 text-orange-700 p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-colors text-left border border-orange-200 hover:border-orange-300"
                            onClick={() => handleIssueSelect(issue)}
                          >
                            {issue}
                          </button>
                        ))}
                      </div>
                      
                      {/* Skip to contact form button */}
                      <button
                        className="w-full text-sm text-gray-500 hover:text-orange-600 mt-2"
                        onClick={() => setActiveTab("contact")}
                      >
                        Skip to detailed contact form
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit}>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                        {inquiryData.issueType ? (
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="mr-2">Let us fix your {inquiryData.issueType}</span>
                            <button
                              type="button"
                              className="text-xs text-orange-600 hover:text-orange-700 whitespace-nowrap"
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
                            <User className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your Name *"
                            className="pl-10"
                            value={inquiryData.name}
                            onChange={handleInquiryChange}
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number *"
                            className="pl-10"
                            value={inquiryData.phone}
                            onChange={handleInquiryChange}
                            required
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Mail className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email (Optional)"
                            className="pl-10"
                            value={inquiryData.email}
                            onChange={handleInquiryChange}
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Home className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            type="text"
                            name="address"
                            placeholder="Property Address (Optional)"
                            className="pl-10"
                            value={inquiryData.address}
                            onChange={handleInquiryChange}
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-orange-500" />
                          </div>
                          <Textarea
                            name="message"
                            placeholder="Describe your issue in detail (Optional)"
                            className="pl-10 pt-2 min-h-[100px]"
                            value={inquiryData.message}
                            onChange={handleInquiryChange}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          We'll contact you soon to discuss your building issues and provide expert solutions.
                        </p>
                      </div>
                    </form>
                  )}
                </TabsContent>
                
                <TabsContent value="contact">
                  <form onSubmit={handleContactSubmit}>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FilePlus className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>Send Us A Message</span>
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <Label htmlFor="contact-name" className="text-sm font-medium mb-1 block">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="h-5 w-5 text-orange-500" />
                          </div>
                          <Input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="pl-10"
                            value={contactData.name}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Label htmlFor="contact-email" className="text-sm font-medium mb-1 block">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Mail className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input
                              id="contact-email"
                              type="email"
                              name="email"
                              placeholder="Your email"
                              className="pl-10"
                              value={contactData.email}
                              onChange={handleContactChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="relative">
                          <Label htmlFor="contact-phone" className="text-sm font-medium mb-1 block">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <Phone className="h-5 w-5 text-orange-500" />
                            </div>
                            <Input
                              id="contact-phone"
                              type="tel"
                              name="phone"
                              placeholder="Your phone number"
                              className="pl-10"
                              value={contactData.phone}
                              onChange={handleContactChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Label htmlFor="contact-service" className="text-sm font-medium mb-1 block">
                          Service Required <span className="text-red-500">*</span>
                        </Label>
                        <Select 
                          value={contactData.service} 
                          onValueChange={handleContactServiceChange}
                          required
                        >
                          <SelectTrigger id="contact-service" className="w-full">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="relative">
                        <Label htmlFor="contact-message" className="text-sm font-medium mb-1 block">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-orange-500" />
                          </div>
                          <Textarea
                            id="contact-message"
                            name="message"
                            placeholder="Describe your building problem or requirements"
                            className="pl-10 pt-2 min-h-[120px]"
                            value={contactData.message}
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="consent" 
                          checked={contactData.consent}
                          onCheckedChange={handleContactCheckboxChange}
                          className="mt-1"
                        />
                        <Label htmlFor="consent" className="text-sm text-gray-600">
                          I agree to the processing of my personal data to receive communications about products and services.
                        </Label>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Our team will get back to you as soon as possible.
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePageForm;