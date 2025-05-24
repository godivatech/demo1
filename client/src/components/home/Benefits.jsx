import { Link } from "wouter";
import { BENEFITS, STATS } from "@/lib/constants";
import { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Building2,
  Activity,
  RotateCw,
  MoveRight,
} from "lucide-react";
import buildingDoctorIcon from "../../assets/building-doctor-icon.png";

const Benefits = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState({});

  // Initialize random rotation for each card - useEffect would be better but we're keeping it simple
  if (Object.keys(rotationDegrees).length === 0) {
    const degrees = {};
    BENEFITS.forEach((benefit) => {
      degrees[benefit.id] = Math.floor(Math.random() * 5) - 2; // Between -2 and 2 degrees
    });
    setRotationDegrees(degrees);
  }

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

      {/* Animated dots pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <RotateCw className="w-4 h-4 text-primary animate-spin" />
            <span className="text-sm font-medium text-primary">
              Building Excellence
            </span>
          </div>

          <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6 leading-tight">
            Why Choose{" "}
            <span className="text-primary relative">
              OM Vinayaga Associates
              <span className="absolute bottom-1 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
            </span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            We don't just repair buildings — we engineer solutions that last,
            combining cutting-edge technology with decades of expertise.
          </p>
        </div>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative transition-all duration-500 h-[350px]"
              onMouseEnter={() => setActiveCard(benefit.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                transform: `rotate(${rotationDegrees[benefit.id] || 0}deg)`,
              }}
            >
              {/* Front Card */}
              <div
                className={`absolute inset-0 bg-white rounded-2xl p-8 flex flex-col shadow-xl border border-gray-100
                  transform transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]
                  ${activeCard === benefit.id ? "opacity-0 [transform:rotateY(180deg)]" : "opacity-100 [transform:rotateY(0deg)]"}
                `}
              >
                {/* Curved banner with icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>

                {/* Card content */}
                <div className="mt-10 flex flex-col h-full">
                  <h3 className="font-montserrat font-bold text-xl md:text-2xl mb-4 text-center">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 mb-6 flex-grow">
                    {benefit.description}
                  </p>

                  <div className="flex justify-center items-center text-sm text-primary font-medium cursor-pointer mt-auto group">
                    <span>Flip to learn more</span>
                    <RotateCw className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
              </div>

              {/* Back of card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 flex flex-col text-white
                  transform transition-all duration-500 [transform-style:preserve-3d] [backface-visibility:hidden]
                  ${activeCard === benefit.id ? "opacity-100 [transform:rotateY(0deg)]" : "opacity-0 [transform:rotateY(180deg)]"}
                `}
              >
                <div className="flex flex-col h-full justify-center items-center text-center">
                  <h3 className="font-montserrat font-bold text-xl md:text-2xl mb-6">
                    {benefit.title}
                  </h3>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Certified technicians with 10+ years experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Premium materials with industry-leading warranties
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <span>24/7 emergency service available</span>
                    </li>
                  </ul>

                  <button className="mt-auto group inline-flex items-center bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-medium transition-all">
                    <span>Request Service</span>
                    <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Abstract shapes */}
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                <div className="absolute bottom-10 left-6 w-12 h-12 border-2 border-white/10 rounded-full"></div>
                <div className="absolute top-1/3 left-6 w-8 h-8 bg-white/10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 relative">
          {/* Animated 3D effect with layered cards */}
          <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-primary/20 transform rotate-2"></div>
          <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-3xl bg-primary/30 transform rotate-1"></div>

          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-16 relative">
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-br-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-tl-3xl"></div>
                
                <div className="inline-flex items-center px-5 py-2.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8 relative z-10">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span>Our Impact</span>
                </div>

                <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight relative z-10">
                  Trusted by
                  <span className="inline-block relative ml-3">
                    <span className="text-primary">Thousands</span>
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 385 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9C116.62 4.46 243.652 2.99999 382 9" stroke="hsl(30 76% 50%)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span> 
                  in Madurai
                </h2>

                <p className="text-gray-600 mb-12 text-lg leading-relaxed relative z-10">
                  Our reputation is built on consistent quality, transparent
                  pricing, and an unwavering commitment to solving your building
                  repair challenges.
                </p>

                <div className="grid grid-cols-2 gap-10 mb-12 relative z-10">
                  {STATS.map((stat) => (
                    <div key={stat.id} className="group relative transform transition-transform hover:-translate-y-1">
                      {/* Card background with subtle gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-white rounded-xl -z-10"></div>
                      
                      <div className="p-6">
                        <div className="text-5xl font-bold text-primary mb-3 flex items-center">
                          {stat.value}
                          <span className="ml-1.5 text-lg text-primary/60">+</span>
                        </div>
                        <p className="text-gray-700 font-medium">{stat.label}</p>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-xl"></div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 group relative z-10"
                >
                  <span className="relative inline-flex group/btn">
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary/20 rounded-full transform transition-transform group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"></span>
                    <span className="relative inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium transition shadow-lg">
                      Our Story
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </span>
                </Link>
              </div>

              {/* Graphical representation with Building Doctor */}
              <div className="relative min-h-[500px] md:h-auto bg-gradient-to-br from-primary/90 to-primary overflow-hidden">
                {/* Abstract building silhouette */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center opacity-20">
                  <div className="w-14 h-64 bg-white/30 mx-1 rounded-t-lg transform -skew-x-2"></div>
                  <div className="w-14 h-80 bg-white/30 mx-1 rounded-t-lg transform skew-x-3"></div>
                  <div className="w-14 h-72 bg-white/30 mx-1 rounded-t-lg transform -skew-x-1"></div>
                  <div className="w-14 h-56 bg-white/30 mx-1 rounded-t-lg transform skew-x-2"></div>
                  <div className="w-14 h-64 bg-white/30 mx-1 rounded-t-lg"></div>
                </div>

                {/* Building Doctor Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[400px] h-[400px]">
                    <img 
                      src={buildingDoctorIcon} 
                      alt="Building Doctor" 
                      className="w-full h-full object-contain z-10 relative animate-float"
                    />
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No custom styles needed - we'll use Tailwind classes */}
    </section>
  );
};
export default Benefits;
