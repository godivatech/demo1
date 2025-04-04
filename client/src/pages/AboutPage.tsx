import { useEffect } from "react";
import { Link } from "wouter";
import { CONTACT, STATS } from "@/lib/constants";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | OM Vinayaga Associates";
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">About Us</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Building Doctor Franchise in Madurai - Your trusted partner for building repairs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Story</p>
              </div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">Building Trust Through <span className="text-primary">Quality Solutions</span></h2>
              <p className="text-gray-600 mb-4">
                OM Vinayaga Associates was established as an authorized franchise of Building Doctor with a mission to provide professional building repair and maintenance solutions to Madurai and surrounding areas.
              </p>
              <p className="text-gray-600 mb-6">
                Led by {CONTACT.director}, our team combines technical expertise with a customer-first approach to deliver exceptional results. We have successfully completed over 1000 projects, helping both residential and commercial property owners address their building repair needs.
              </p>
              
              <div className="grid grid-cols-2 gap-6 my-8">
                {STATS.map((stat) => (
                  <div key={stat.id} className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-xl relative z-20 overflow-hidden">
                <div className="w-full h-[400px] rounded-lg bg-gray-300"></div>
              </div>
              <div className="absolute top-8 -right-8 w-72 h-72 bg-primary rounded-full opacity-10 -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-[#2b4c7e] rounded-full opacity-10 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Approach</p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl mb-6">What Sets Us Apart</h2>
            <p className="text-gray-600">
              We believe in providing comprehensive solutions that address the root causes of building problems, not just their symptoms. Our methodical approach ensures long-lasting results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-search text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">1. Thorough Assessment</h3>
              <p className="text-gray-600">
                We conduct detailed inspections to identify the underlying causes of building issues, ensuring our solutions address the root problems rather than just the symptoms.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clipboard-list text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">2. Customized Solutions</h3>
              <p className="text-gray-600">
                Every building is unique. We develop tailored solutions that consider your specific requirements, building conditions, and budget constraints.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tools text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">3. Quality Implementation</h3>
              <p className="text-gray-600">
                Our trained applicators use premium quality products and follow industry best practices to ensure high-quality workmanship and durable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Team</p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl mb-6">Meet The Experts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team consists of trained professionals with extensive experience in building repair and maintenance. Led by {CONTACT.director}, we are committed to delivering exceptional results.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-80 relative">
                  <div className="w-full h-full bg-gray-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-montserrat font-bold text-xl">{CONTACT.director}</h3>
                    <p className="text-gray-200">{CONTACT.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 mb-4">
                    Civil engineering expert with extensive experience in building repair and waterproofing solutions. Leader of OM Vinayaga Associates since its inception.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">Our Building Doctor Franchise</h2>
            <p className="text-gray-600 mb-8">
              Being a part of the Building Doctor network enables us to bring the latest technologies and proven solutions to Madurai. We combine the national expertise of Building Doctor with our local understanding to provide superior services.
            </p>
            <div className="aspect-video w-full mb-8 bg-gray-200 rounded-xl"></div>
            <Link href="/contact">
              <a className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
                Contact Us Today
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
