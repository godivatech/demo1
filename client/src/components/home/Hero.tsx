import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-24 md:pt-28 relative overflow-hidden bg-gradient-to-r from-[#2b4c7e] to-[#2b4c7e]">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24 relative z-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
            <div className="inline-block px-4 py-1 bg-primary rounded-full mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider">Madurai's Trusted Building Experts</p>
            </div>
            <h1 className="font-montserrat font-bold text-3xl md:text-5xl leading-tight mb-4">
              Solving <span className="text-primary">Building Problems</span> With Expert Solutions
            </h1>
            <p className="text-lg mb-6 text-gray-200 max-w-lg">
              Specializing in waterproofing, structural repairs, and high-quality construction chemicals with a 10+ year track record of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 font-medium">
                  Explore Our Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary border-white px-6 py-3 font-medium">
                  Book A Site Visit
                </Button>
              </Link>
            </div>
            <div className="flex items-center mt-8 space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-500"></div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <span className="ml-2 text-white font-medium">4.9/5</span>
                </div>
                <p className="text-sm text-gray-300">From 200+ happy customers</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gray-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white bg-opacity-90 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <i className="fas fa-check text-white"></i>
                    </div>
                    <h3 className="font-montserrat font-bold text-primary">10+ Years of Excellence</h3>
                  </div>
                  <p className="text-sm text-gray-700">Trusted by 10,000+ customers across Madurai and surrounding areas</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg transform rotate-6 z-10 animate-bounce">
              <p className="font-bold">No more leaks!</p>
              <p className="text-sm">No more cracks!</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
