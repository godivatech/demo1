import { useState } from "react";
import { CONTACT } from "@/lib/constants";
import { SOCIAL_MEDIA } from "@/data/company";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { contactSchema } from "@/data/schema";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form using Zod schema
    try {
      // Validate the form data against our schema
      const validatedData = contactSchema.parse(formData);
      
      setIsSubmitting(true);
      
      // Send validated data to the correct API endpoint
      await apiRequest("POST", "/api/contacts", validatedData);
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default"
      });
      
      // Invalidate any contacts cache to refresh admin panel
      queryClient.invalidateQueries(["contacts"]);
      
      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        consent: false
      });
      
      // Scroll to the top of the form
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
        console.error("Error submitting contact form:", error);
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">Get In Touch</p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Contact <span className="text-primary">Our Experts</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Reach out to us for consultations, quotes, or to schedule a site visit.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-6 md:p-8">
            <h3 className="font-montserrat font-bold text-xl mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  {CONTACT.addresses ? (
                    CONTACT.addresses.map((address, index) => (
                      <p key={index} className="text-gray-600 mb-2">
                        {address}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">{CONTACT.address}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  {CONTACT.phone.map((phone, index) => (
                    <p key={index} className="text-gray-600">
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-primary transition">
                        {phone}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-600">
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Working Hours</h4>
                  <p className="text-gray-600">{CONTACT.workingHours}</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href={SOCIAL_MEDIA.facebook} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} strokeWidth={2.5} />
                </a>
                <a href={SOCIAL_MEDIA.twitter} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} strokeWidth={2.5} />
                </a>
                <a href={SOCIAL_MEDIA.instagram} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="font-montserrat font-bold text-xl mb-6">Send Us A Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="service">Service Required</label>
                  <select 
                    id="service" 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="waterproofing">Waterproofing</option>
                    <option value="structural-repairs">Structural Repairs</option>
                    <option value="sealants">Sealants & Adhesives</option>
                    <option value="waterproof-coatings">Waterproof Coatings</option>
                    <option value="construction-chemicals">Construction Chemicals</option>
                    <option value="technical-consultation">Technical Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  placeholder="Describe your building problem or requirements"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleCheckboxChange}
                  className="mt-1 mr-2"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to the processing of my personal data to receive communications about products and services.
                </label>
              </div>
              
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition w-full md:w-auto disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 bg-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8999114405763!2d78.12356181079485!3d9.9361916741588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c59fc9ffd737%3A0x44e6b0aa1d66d76c!2sNorth%20Gate%2C%20SS%20Colony%2C%20Madurai%2C%20Tamil%20Nadu%20625010!5e0!3m2!1sen!2sin!4v1684758905019!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="OM Vinayaga Associates - S.S Colony Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;