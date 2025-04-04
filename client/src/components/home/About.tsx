import { Link } from "wouter";
import { CONTACT } from "@/lib/constants";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">About Us</p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">Madurai's Trusted <span className="text-primary">Building Repair Experts</span></h2>
            <p className="text-gray-600 mb-4">OM Vinayaga Associates is an authorized franchise of Building Doctor, bringing professional building repair and maintenance solutions to Madurai and surrounding areas.</p>
            <p className="text-gray-600 mb-6">With a strong foundation in technical expertise and customer service, we have established ourselves as the go-to specialists for waterproofing, structural repairs, and construction chemicals in the region.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-primary"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-1">Our Mission</h3>
                  <p className="text-gray-600">To provide high-quality, affordable building repair solutions that enhance the longevity and value of our customers' properties.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-primary"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-1">Our Approach</h3>
                  <p className="text-gray-600">We combine technical expertise with personalized service, ensuring each project receives the attention to detail it deserves.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <a className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition text-center">
                  Contact Us
                </a>
              </Link>
              <Link href="/services">
                <a className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium transition border border-primary text-center">
                  Our Services
                </a>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-4 rounded-xl shadow-xl relative z-20 overflow-hidden">
              <div className="w-full h-[400px] rounded-lg bg-gray-300"></div>
            </div>
            <div className="absolute top-8 -right-8 w-72 h-72 bg-primary rounded-full opacity-10 -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-[#2b4c7e] rounded-full opacity-10 -z-10"></div>
            
            <div className="absolute bottom-8 -right-4 bg-white p-6 rounded-xl shadow-xl z-30">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-4xl font-bold text-primary">10+</div>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="ml-4">
                  <div className="text-4xl font-bold text-primary">100+</div>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-3">Meet Our <span className="text-primary">Leadership</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The experienced professionals behind OM Vinayaga Associates.</p>
          </div>
          
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-64 relative">
                  <div className="w-full h-full bg-gray-400"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-montserrat font-bold text-xl">{CONTACT.director}</h3>
                    <p className="text-gray-200">{CONTACT.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 mb-4">Civil engineering expert with extensive experience in building repair and waterproofing solutions.</p>
                  <div className="flex space-x-3">
                    <a href={`https://www.facebook.com/${CONTACT.social.facebook}`} className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={`https://twitter.com/${CONTACT.social.twitter}`} className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={`https://www.linkedin.com/in/${CONTACT.director.toLowerCase().replace(/\s+/g, '-')}`} className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
