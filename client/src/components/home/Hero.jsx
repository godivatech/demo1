import { useState, useEffect, memo, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hammer,
  Droplets,
  Shield,
  ArrowRight,
  Star,
  Zap,
  Play,
  CheckCircle2,
} from "lucide-react";

// Preload images for faster rendering
import thermalImage from "../../assets/thermal.png";
import sealantsImage from "../../assets/sealants.png";
import img1 from "../../assets/img1.png";

// Static data defined outside component to prevent re-creation on renders
const BUILDING_PROBLEMS = [
  {
    problem: "Leaking Roofs",
    solution: "Advanced Waterproofing",
    icon: (
      <Droplets className="h-6 w-6 text-white group-hover:text-black transition-colors" />
    ),
  },
  {
    problem: "Wall Cracks",
    solution: "Structural Reinforcement",
    icon: (
      <Hammer className="h-6 w-6 text-white group-hover:text-black transition-colors" />
    ),
  },
  {
    problem: "Seepage Issues",
    solution: "Chemical Treatment",
    icon: (
      <Shield className="h-6 w-6 text-white group-hover:text-black transition-colors" />
    ),
  },
];

const FEATURES = [
  "Complete Building Diagnostics",
  "Advanced Waterproofing Solutions",
  "Guaranteed Leak-Free Results",
];

const STAR_RATINGS = [1, 2, 3, 4, 5];
const CLIENT_IMAGES = [thermalImage, img1, sealantsImage];

// Memoized problem indicator component
const ProblemIndicator = memo(({ currentProblem }) => {
  return (
    <div className="absolute top-4 left-4 z-30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProblem}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="bg-red-100 border border-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse"
        >
          Problem Detected: {BUILDING_PROBLEMS[currentProblem].problem}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

// Memoized feature item
const FeatureItem = memo(({ feature }) => (
  <div className="flex items-center group">
    <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 text-yellow-400">
      <CheckCircle2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
    </div>
    <p className="text-white/90 font-medium">{feature}</p>
  </div>
));

// Memoized client avatar
const ClientAvatar = memo(({ img, index }) => (
  <div
    key={index}
    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
  >
    <img
      src={img}
      alt={`Client ${index}`}
      className="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
));

// Memoized star rating component
const StarRating = memo(() => (
  <div className="text-yellow-300 flex gap-0.5">
    {STAR_RATINGS.map((_, i) => (
      <Star key={i} size={14} fill="currentColor" />
    ))}
  </div>
));

// Main Hero component
const Hero = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  // Use memoized position styles to prevent style recalculations
  const problemPositionStyle = useMemo(
    () => ({
      top: currentProblem === 0 ? "25%" : currentProblem === 1 ? "40%" : "60%",
      left: currentProblem === 0 ? "70%" : currentProblem === 1 ? "30%" : "55%",
    }),
    [currentProblem]
  );

  // Animation variants - defined once and reused
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Problem rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % BUILDING_PROBLEMS.length);
      setShowDiagnosis(false);

      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        setTimeout(() => setShowDiagnosis(true), 800);
      });
    }, 4000);

    // Initial diagnosis display
    const initialTimer = setTimeout(() => setShowDiagnosis(true), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="pt-28 md:pt-32 overflow-hidden bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70 min-h-[90vh] flex items-center relative"
    >
      {/* Background decorative elements - will-change hint for GPU acceleration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://buildingdoctor.org/assets/images/texture-pattern.png')] opacity-5 mix-blend-overlay"></div>

        {/* Use transform: translateZ(0) for hardware acceleration */}
        <motion.div
          className="absolute top-10 right-10 w-96 h-96 rounded-full bg-primary/20 blur-3xl will-change-transform"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(0)" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-primary/20 blur-3xl will-change-transform"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(0)" }}
        />
      </div>

      <div className="container mx-auto px-4 pt-8 pb-16 md:pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side content */}
          <div className="lg:col-span-6 text-white">
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6 border border-white/10"
            >
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-yellow-50">
                Madurai's Most Trusted Building Experts
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8"
            >
              Transform Your
              <br className="hidden md:block" />
              Building With Expert
              <span className="relative text-yellow-300 ml-2">
                Care
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 385 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C116.62 4.46 243.652 2.99999 382 9"
                    stroke="#FCD34D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              We diagnose and treat all building ailments with precision. From
              waterproofing to structural repairs, our experts provide
              long-lasting solutions with 10+ years of experience.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-4 mb-10"
            >
              {FEATURES.map((feature, i) => (
                <FeatureItem key={i} feature={feature} />
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/services">
                <span className="relative inline-flex group/btn">
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-full transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
                  <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium transition shadow-lg">
                    Book A Diagnosis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-medium transition-all cursor-pointer">
                  View Solutions
                  <Play className="ml-2 w-4 h-4 fill-current" />
                </span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex items-center justify-between max-w-md"
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {CLIENT_IMAGES.map((img, i) => (
                    <ClientAvatar key={i} img={img} index={i} />
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-xs text-white/70">Trusted by</p>
                  <p className="text-sm font-semibold text-white">
                    2,000+ Happy Clients
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <StarRating />
                <span className="ml-1 text-sm font-medium text-white">
                  4.9/5
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right side image collage */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              {/* Main image with fancy border */}
              <div className="relative z-20 overflow-hidden rounded-2xl shadow-2xl border-4 border-white/10 bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-sm">
                <img
                  src={img1}
                  alt="Building Doctor Professional"
                  className="w-full object-cover h-[500px]"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                {/* Pulsing dots for problem indicators */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProblem}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute"
                    style={problemPositionStyle}
                  >
                    <div className="relative">
                      <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center animate-pulse"></div>
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-50"></div>
                      <div className="absolute -right-40 top-0 bg-black/70 text-white text-xs rounded-lg px-3 py-2 min-w-[150px]">
                        <div className="font-bold text-red-400">
                          {BUILDING_PROBLEMS[currentProblem].problem}
                        </div>
                        <div className="text-green-400 text-xs mt-1">
                          <ArrowRight className="inline w-3 h-3 mr-1" />
                          {BUILDING_PROBLEMS[currentProblem].solution}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Image overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center mb-2">
                        <Zap className="text-yellow-400 w-5 h-5 mr-2" />
                        <p className="font-medium">Expert Diagnosis</p>
                      </div>
                      <h3 className="text-2xl font-bold">Building Doctor</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                      <p className="text-xs font-medium">Since 2010</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating smaller images with loading optimization */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-10 -left-10 z-10 w-36 h-36 rounded-xl overflow-hidden border-4 border-white/10 shadow-lg"
              >
                <img
                  src={thermalImage}
                  alt="Thermal Solution"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-10 -right-10 z-10 w-40 h-40 rounded-xl overflow-hidden border-4 border-white/10 shadow-lg"
              >
                <img
                  src={sealantsImage}
                  alt="Sealant Solution"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-5 right-20 z-30 bg-primary text-white px-5 py-3 rounded-full shadow-lg flex items-center"
              >
                <span className="text-xl font-bold mr-1">10+</span>
                <span className="text-sm font-medium">Years Experience</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(Hero);
