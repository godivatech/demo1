import { Link } from "wouter";
import { BENEFITS, STATS } from "@/lib/constants";

const Benefits = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-3">Why Choose <span className="text-primary">OM Vinayaga Associates</span>?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">We offer comprehensive solutions for all your building repair and maintenance needs, backed by the trusted Building Doctor brand.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => (
            <div 
              key={benefit.id}
              className="bg-white rounded-lg p-6 shadow-lg border-t-4 border-primary hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-5">
                <i className={`fas fa-${benefit.icon} text-2xl text-primary`}></i>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-3">{benefit.title}</h3>
              <p className="text-gray-600 mb-4">{benefit.description}</p>
              <div className="flex items-center text-sm text-primary font-medium">
                <span>Learn more</span>
                <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">Delivering Excellence Across Madurai</h2>
              <p className="text-gray-600 mb-6">Our commitment to quality and customer satisfaction has made us the preferred choice for building repair services in Madurai and surrounding areas.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {STATS.map((stat) => (
                  <div key={stat.id} className="bg-white p-4 rounded-lg shadow text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/about">
                <a className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
                  About Our Company
                </a>
              </Link>
            </div>
            <div className="relative h-96 md:h-auto">
              <div className="absolute inset-0 w-full h-full bg-gray-700"></div>
              <div className="absolute inset-0 bg-primary bg-opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;