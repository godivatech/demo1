import { Link } from "wouter";
import { SERVICES } from "@/lib/constants";

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Expertise</p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">Comprehensive Building <span className="text-primary">Solutions</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">From waterproofing to structural repairs, we offer specialized services to address all your building maintenance and repair needs.</p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-2 duration-300"
            >
              <div className="relative h-56">
                <div className="w-full h-full bg-gray-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-montserrat font-bold text-xl">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-primary mt-1 mr-2"></i>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/services#${service.slug}`}>
                  <a className="inline-block text-primary font-medium hover:text-primary/90 transition">
                    Learn more <i className="fas fa-arrow-right ml-1 text-xs"></i>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-16 bg-[#2b4c7e] rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">Not sure which service you need?</h2>
              <p className="text-gray-300 mb-6">Our experts will assess your building's condition and recommend the most effective solutions for your specific requirements.</p>
              <Link href="/contact">
                <a className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
                  Request Free Consultation
                </a>
              </Link>
            </div>
            <div className="md:col-span-2 relative h-60 md:h-auto">
              <div className="absolute inset-0 w-full h-full bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;