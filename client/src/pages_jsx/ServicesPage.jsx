import { useEffect, useState } from "react";
import { Link } from "wouter";
import { SERVICES } from "../data/services";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "../utils/animations";
import { FaYoutube, FaArrowRight } from "react-icons/fa";
import sealantsImage from "../assets/sealants.png";
import tileAidsImage from "../assets/Tile-Aids.png";
import thermalImage from "../assets/thermal.png";

const ServicesPage = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Our Services | OM Vinayaga Associates";
  }, []);

  const openVideoModal = (videoUrl) => {
    setActiveVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Function to extract YouTube video ID from URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : '';
  };

  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp(0.3)}
            className="text-center text-white"
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Our Services</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Comprehensive building repair and maintenance solutions to protect and enhance your property
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp(0.4)}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-montserrat font-bold text-3xl mb-4">Expert Solutions for All Building Problems</h2>
            <p className="text-gray-600">
              At OM Vinayaga Associates, we offer a comprehensive range of specialized services designed to address all your building repair and maintenance needs. Our team of experts uses high-quality products and proven techniques to deliver long-lasting results.
            </p>
          </motion.div>

          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp(0.2)}
                key={service.id} 
                id={service.slug} 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-mt-24"
              >
                <div className={`order-2 ${service.id % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    {/* Use custom images for specific services, otherwise use the service image */}
                    {service.image || service.title.includes('Sealant') || service.title.toLowerCase().includes('tile') || service.title.toLowerCase().includes('thermal') || service.title.toLowerCase().includes('waterproof') ? (
                      <>
                        <img 
                          src={
                            service.title.includes('Sealant') ? sealantsImage : 
                            service.title.toLowerCase().includes('tile') ? tileAidsImage : 
                            service.title.toLowerCase().includes('thermal') || service.title.toLowerCase().includes('waterproof') ? thermalImage :
                            service.image
                          } 
                          alt={service.title} 
                          className="h-96 object-cover w-full transition-transform duration-500 group-hover:scale-105"
                        />
                        {service.videoUrl && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            onClick={() => openVideoModal(service.videoUrl)}
                            style={{
                              backgroundImage: service.title.toLowerCase().includes('tile') ? `url(${tileAidsImage})` : 
                                              service.title.toLowerCase().includes('thermal') || service.title.toLowerCase().includes('waterproof') ? `url(${thermalImage})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              backdropFilter: 'blur(2px)'
                            }}
                          >
                            {/* Semi-transparent overlay for better visibility of play button */}
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center z-10 shadow-lg hover:scale-105 transition-transform">
                              <FaYoutube className="text-red-600 text-3xl" />
                            </div>
                            <span className="absolute bottom-4 left-4 text-white font-medium z-10 bg-black/50 px-3 py-1 rounded-full">Watch Video</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="rounded-xl overflow-hidden h-96 bg-gray-200"></div>
                    )}
                  </div>
                </div>

                <div className={`order-1 ${service.id % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-3">
                    <p className="text-xs font-medium text-primary">Premium Service</p>
                  </div>
                  <h2 className="font-montserrat font-bold text-3xl mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {service.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                            <i className="fas fa-check text-primary text-sm"></i>
                          </div>
                          <p>{feature}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {service.applications && service.applications.length > 0 && (
                    <div className="mt-8 mb-8">
                      <h3 className="font-semibold text-lg mb-4">Applications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {service.applications.map((app, index) => (
                          <div key={index} className="flex items-center p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <p className="text-sm font-medium">{app.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact">
                      <Button className="bg-primary hover:bg-primary/90">
                        Get a Quote <FaArrowRight className="ml-2" size={14} />
                      </Button>
                    </Link>
                    {service.videoUrl && (
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={() => openVideoModal(service.videoUrl)}
                      >
                        Watch Video <FaYoutube className="ml-2" size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp(0.3)}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-montserrat font-bold text-3xl mb-4">Need Help With Your Building Issues?</h2>
                <p className="text-gray-600 mb-8">
                  Our team of experts is ready to assess your property and provide tailored solutions to address your specific building repair and maintenance needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Request a Free Consultation
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Browse Our Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              onClick={closeVideoModal}
            >
              <span className="text-2xl">×</span> Close
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={getYoutubeEmbedUrl(activeVideoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;