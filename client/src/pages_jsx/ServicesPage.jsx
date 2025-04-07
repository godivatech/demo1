import { useEffect } from "react";
import { Link } from "wouter";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
  useEffect(() => {
    document.title = "Our Services | OM Vinayaga Associates";
  }, []);

  return (
    <div className="pt-24">
      <section className="bg-[#2b4c7e] py-20 relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">Our Services</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Comprehensive building repair and maintenance solutions to protect and enhance your property
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl mb-4">Expert Solutions for All Building Problems</h2>
            <p className="text-gray-600">
              At OM Vinayaga Associates, we offer a comprehensive range of specialized services designed to address all your building repair and maintenance needs. Our team of experts uses high-quality products and proven techniques to deliver long-lasting results.
            </p>
          </div>

          <div className="space-y-16">
            {SERVICES.map((service) => (
              <div key={service.id} id={service.slug} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center scroll-mt-24">
                <div className={`order-2 ${service.id % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="rounded-xl overflow-hidden h-96 bg-gray-200"></div>
                </div>
                <div className={`order-1 ${service.id % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-3">
                    <p className="text-xs font-medium text-primary">Service {service.id}</p>
                  </div>
                  <h2 className="font-montserrat font-bold text-3xl mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                          <i className="fas fa-check text-primary text-sm"></i>
                        </div>
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90">Get a Quote</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-montserrat font-bold text-3xl mb-4">Need Help With Your Building Issues?</h2>
                <p className="text-gray-600 mb-8">
                  Our team of experts is ready to assess your property and provide tailored solutions to address your specific building repair and maintenance needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Request a Free Consultation
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      Browse Our Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;