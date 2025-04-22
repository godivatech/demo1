import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../../data/services";
import { fadeInUp } from "../../utils/animations";
import { FaYoutube, FaArrowRight, FaPlay } from "react-icons/fa";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import workerImage from "../../assets/img1.png";
import sealantsImage from "../../assets/sealants.png";

const Services = () => {
  // Get top 6 services for homepage display
  const featuredServices = SERVICES.slice(0, 6);
  
  // State for video modal
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  
  // Function to open video modal
  const openVideoModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setVideoOpen(true);
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.3)}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-primary">Our Expertise</span>
          </div>
          
          <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">
            Comprehensive Building{" "}
            <span className="text-primary relative">
              Solutions
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            From waterproofing to structural repairs, we offer specialized
            services to address all your building maintenance and repair needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp((index % 3) * 0.1 + 0.3)}
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-2xl duration-300 group border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                {service.image || service.title.includes('Sealant') ? (
                  <img
                    src={
                      service.title.includes('Sealant') ? sealantsImage : 
                      service.image
                    }
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 transition-transform duration-700 group-hover:scale-110"></div>
                )}
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-70"></div>
                
                {/* Service badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-xs font-medium text-white">{service.category || 'Building Repair'}</span>
                </div>
                
                {/* YouTube video button */}
                {service.videoUrl && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      openVideoModal(service.videoUrl);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm text-red-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-lg border border-white/20 group/yt"
                    aria-label={`Watch ${service.title} video`}
                  >
                    <FaYoutube className="text-red-600 w-5 h-5 group-hover/yt:scale-110 transition" />
                    <span className="absolute -bottom-8 right-0 text-white text-xs bg-black/70 px-2 py-1 rounded-md opacity-0 group-hover/yt:opacity-100 transition-opacity duration-300">Watch Video</span>
                  </button>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <h3 className="text-white font-montserrat font-bold text-xl drop-shadow-sm">
                    {service.title}
                  </h3>
                  
                  {/* Play button for services with video */}
                  {service.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openVideoModal(service.videoUrl);
                      }}
                      className="flex items-center justify-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs hover:bg-white/30 transition-colors border border-white/20"
                    >
                      <FaPlay className="w-3 h-3" />
                      <span>Play</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="p-6">
                {/* Description with gradient fade effect */}
                <div className="relative mb-4">
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {service.description.split(".")[0]}.
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {service.applications && service.applications.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-3">
                    {service.applications.slice(0, 4).map((app, idx) => (
                      <div key={idx} className="flex items-center p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="text-xs text-gray-700 truncate font-medium">
                          {app.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {!service.applications &&
                  service.features &&
                  service.features.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                <Link href={`/services#${service.slug}`}>
                  <span className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition cursor-pointer text-sm group/link">
                    Learn more 
                    <span className="relative ml-2 overflow-hidden inline-flex">
                      <FaArrowRight className="transition-all duration-300 transform group-hover/link:translate-x-6" />
                      <FaArrowRight className="absolute transition-all duration-300 transform -translate-x-6 group-hover/link:translate-x-0" />
                    </span>
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button - Enhanced Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.5)}
          className="text-center mt-16"
        >
          <Link href="/services">
            <span className="relative inline-flex group/btn">
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-lg transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
              <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-medium transition shadow-lg">
                View All Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </span>
          </Link>
        </motion.div>

        {/* CTA Banner - Enhanced Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp(0.6)}
          className="mt-24 rounded-3xl overflow-hidden shadow-2xl relative border border-blue-900/10 group/cta"
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b4c7e] to-[#1a365d] opacity-100"></div>
          <div className="absolute inset-0 bg-[url('https://buildingdoctor.org/assets/images/texture-pattern.png')] opacity-10 mix-blend-overlay"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-x-16 -translate-y-32 blur-3xl group-hover/cta:opacity-70 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full translate-x-8 translate-y-24 blur-3xl opacity-50 group-hover/cta:opacity-70 transition-opacity duration-700"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 relative z-10">
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">Expert Consultation</span>
              </div>
              
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6 leading-tight">
                Not sure which service <br className="hidden md:block" /> you need?
              </h2>
              
              <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-lg">
                Our experts will assess your building's condition and recommend
                the most effective solutions for your specific requirements, ensuring
                long-lasting results.
              </p>
              
              {/* Feature points */}
              <div className="space-y-4 mb-8">
                {["Free Assessment", "Detailed Report", "No Obligation"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-white font-medium">{feature}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/contact">
                <span className="inline-flex items-center bg-white hover:bg-white/90 text-[#2b4c7e] px-8 py-4 rounded-full font-medium transition shadow-xl hover:shadow-2xl shadow-blue-900/20 group/link">
                  Request Free Consultation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
            
            <div className="md:col-span-5 relative h-60 md:h-auto overflow-hidden">
              <img
                src={workerImage}
                alt="Building Doctor Professional in Orange Safety Suit"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/cta:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-[#2b4c7e]/90 via-[#2b4c7e]/50 to-transparent mix-blend-multiply"></div>
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-bold text-[#2b4c7e]">100% Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 bg-black border-none overflow-hidden rounded-xl">
          <div className="relative w-full pb-[56.25%] h-0">
            {currentVideo && (
              <iframe
                src={`${currentVideo.includes('youtube.com') 
                  ? currentVideo.replace('watch?v=', 'embed/').split('&')[0] 
                  : currentVideo.includes('youtu.be')
                    ? `https://www.youtube.com/embed/${currentVideo.split('/').pop().split('?')[0]}`
                    : currentVideo.split('?')[0]}?autoplay=1&rel=0`}
                title="Service Video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            
            <button 
              onClick={() => setVideoOpen(false)} 
              className="absolute top-4 right-4 z-50 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:scale-105 transition-all"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
