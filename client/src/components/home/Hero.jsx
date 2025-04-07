import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, Droplets, Shield, ArrowRight, Check } from "lucide-react";

const Hero = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  const buildingProblems = [
    { problem: "Leaking Roofs", solution: "Advanced Waterproofing", icon: <Droplets className="h-6 w-6 text-white group-hover:text-black transition-colors" /> },
    { problem: "Wall Cracks", solution: "Structural Reinforcement", icon: <Hammer className="h-6 w-6 text-white group-hover:text-black transition-colors" /> },
    { problem: "Seepage Issues", solution: "Chemical Treatment", icon: <Shield className="h-6 w-6 text-white group-hover:text-black transition-colors" /> },
  ];

  // Auto rotation of problems
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % buildingProblems.length);
      setShowDiagnosis(false);
      setTimeout(() => {
        setShowDiagnosis(true);
      }, 800);
    }, 4000);

    // Show diagnosis after initial load
    setTimeout(() => {
      setShowDiagnosis(true);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-24 mt-10 overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 min-h-[85vh] flex items-center">
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24 relative z-20">
        {/* Building Doctor Interactive UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side building visual */}
          <div className="lg:col-span-6 relative">
            <div className="bg-white p-6 rounded-2xl shadow-xl relative overflow-hidden border-2 border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                  Building Doctor Diagnostic Tool
                </div>
              </div>
              
              {/* Building Problems Visualizer */}
              <div className="relative h-72 bg-gradient-to-b from-blue-50 to-orange-50 rounded-lg overflow-hidden border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gray-200 rounded-md relative building-shape">
                    {/* Roof */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-orange-300 to-orange-400 transform -skew-y-6"></div>
                    
                    {/* Current Problem Indicator */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentProblem}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="absolute"
                        style={{
                          top: currentProblem === 0 ? '15%' : currentProblem === 1 ? '50%' : '80%',
                          left: currentProblem === 0 ? '60%' : currentProblem === 1 ? '30%' : '70%',
                        }}
                      >
                        <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center text-white animate-pulse">
                          <span className="text-xs font-bold">!</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Windows */}
                    <div className="absolute top-20 left-4 w-10 h-14 bg-blue-300 border-2 border-blue-400 rounded"></div>
                    <div className="absolute top-20 right-4 w-10 h-14 bg-blue-300 border-2 border-blue-400 rounded"></div>
                    <div className="absolute bottom-20 left-4 w-10 h-14 bg-blue-300 border-2 border-blue-400 rounded"></div>
                    <div className="absolute bottom-20 right-4 w-10 h-14 bg-blue-300 border-2 border-blue-400 rounded"></div>
                    
                    {/* Door */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-20 bg-orange-700 rounded-t-lg"></div>
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* Problem Label */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-100 border border-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                    Problem Detected
                  </div>
                </div>
                
                {/* Scanning Animation */}
                <motion.div 
                  className="absolute inset-0 border-2 border-blue-500 rounded-lg z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.1, 0.5, 0.1], 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "linear" 
                  }}
                ></motion.div>
                
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-blue-500 z-20"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "linear" 
                  }}
                ></motion.div>
              </div>
              
              {/* Diagnostic Results */}
              <AnimatePresence>
                {showDiagnosis && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 h-[140px]">
                    <motion.div 
                      key={currentProblem}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group">
                          {buildingProblems[currentProblem].icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3 className="text-red-600 font-semibold">Detected: {buildingProblems[currentProblem].problem}</h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">Critical</span>
                          </div>
                          <div className="mt-2 flex items-center group">
                            <ArrowRight className="h-4 w-4 text-white group-hover:text-black transition-colors mr-2" />
                            <div className="text-green-700 font-semibold">Solution: {buildingProblems[currentProblem].solution}</div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Our building doctors can fix this with professional-grade materials and techniques
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-200 flex items-center justify-center text-xs font-bold">TN</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center text-xs font-bold">RJ</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-green-200 flex items-center justify-center text-xs font-bold">KV</div>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Trusted by</p>
                  <p className="text-sm font-semibold">2,000+ Happy Clients</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-yellow-500 flex gap-0.5">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="ml-1 text-sm font-medium">4.9/5</span>
              </div>
            </div>
          </div>
          
          {/* Right side content */}
          <div className="lg:col-span-6">
            <div className="bg-orange-50 px-5 py-2 rounded-full inline-flex items-center mb-4">
              <span className="bg-white p-1 rounded-full mr-2 group">
                <Check className="h-4 w-4 text-white group-hover:text-black transition-colors" />
              </span>
              <p className="text-xs font-semibold text-orange-800">Madurai's Most Trusted Building Experts</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Your Building's <span className="text-orange-600 relative">
                Doctor
                <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-200 -z-10"></span>
              </span> Has Arrived
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              We diagnose and treat all building ailments with precision. From waterproofing to structural repairs, our experts provide long-lasting solutions with 10+ years of experience.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Complete Building Diagnostics",
                "Advanced Waterproofing Solutions",
                "Guaranteed Leak-Free Results"
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 group">
                    <Check className="h-4 w-4 text-white group-hover:text-black transition-colors" />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-medium">
                  Book A Diagnosis
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white hover:bg-gray-50 text-orange-600 border-orange-200 px-8 py-3 rounded-xl font-medium">
                  View Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;