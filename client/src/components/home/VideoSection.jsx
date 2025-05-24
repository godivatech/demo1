import { useState } from "react";
import { motion } from "framer-motion";
import { Play, MapPin, Calendar, Users } from "lucide-react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" }
    }
  });

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mb-24"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp(0.2)}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Latest Milestone</span>
          </div>
          
          <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">
            Our New{" "}
            <span className="text-primary relative">
              Sales Point
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>{" "}
            Inauguration
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Witness the grand opening of our latest sales point in Madurai, expanding our reach to serve you better with premium building solutions.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp(0.4)}
            className="relative"
          >
            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {!isPlaying ? (
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative">
                    <img 
                      src="https://img.youtube.com/vi/SNKboUDhr_w/maxresdefault.jpg"
                      alt="Sales Point Inauguration"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Play Button */}
                    <motion.button
                      onClick={handlePlayClick}
                      className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="text-white ml-1" size={32} strokeWidth={2} fill="currentColor" />
                    </motion.button>
                    
                    {/* Video Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <MapPin size={16} className="text-primary" />
                        <span className="text-sm font-medium">Madurai, Tamil Nadu</span>
                      </div>
                      <h3 className="text-white font-bold text-xl md:text-2xl">
                        SALES POINT Inauguration @ Madurai
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/SNKboUDhr_w?autoplay=1&rel=0"
                    title="Sales Point Inauguration"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* Location Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp(0.6)}
              className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">New Location</h4>
                    <p className="text-gray-600 text-sm">
                      Door No. 131, Shop No. 12<br />
                      Kallazhagar Complex<br />
                      Thallakulam Main Road, Madurai
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-primary" size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Serving Community</h4>
                    <p className="text-gray-600 text-sm">
                      Bringing premium building<br />
                      solutions closer to our<br />
                      valued customers in Madurai
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-primary" size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Milestone Achievement</h4>
                    <p className="text-gray-600 text-sm">
                      Another step forward in our<br />
                      mission to provide excellent<br />
                      building repair services
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;