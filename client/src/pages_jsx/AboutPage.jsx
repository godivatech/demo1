import { useEffect } from "react";
import { Link } from "wouter";
import { CONTACT, STATS } from "@/lib/constants";
import directorImage from "@/assets/jeyaram.jpg";

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
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-4">
              About Us
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-200">
              Building Doctor Franchise in Madurai - Your trusted partner for
              building repairs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  Our Story
                </p>
              </div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
                Building Trust Through{" "}
                <span className="text-primary">Quality Solutions</span>
              </h2>
              <p className="text-gray-600 mb-4">
                OM Vinayaga Associates was established as an authorized
                franchise of Building Doctor with a mission to provide
                professional building repair and maintenance solutions to
                Madurai and surrounding areas.
              </p>
              <p className="text-gray-600 mb-6">
                Led by {CONTACT.director}, our team combines technical expertise
                with a customer-first approach to deliver exceptional results.
                We have successfully completed over 1000 projects, helping both
                residential and commercial property owners address their
                building repair needs.
              </p>

              <div className="grid grid-cols-2 gap-6 my-8">
                {STATS.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white p-4 rounded-lg shadow text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 rounded-xl shadow-xl relative z-20 overflow-hidden">
                <img
                  src={directorImage}
                  alt={CONTACT.director}
                  className="w-full h-[400px] rounded-lg object-contain bg-gray-100"
                />
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
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                Our Approach
              </p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600">
              We believe in providing comprehensive solutions that address the
              root causes of building problems, not just their symptoms. Our
              methodical approach ensures long-lasting results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-search text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">
                1. Thorough Assessment
              </h3>
              <p className="text-gray-600">
                We conduct detailed inspections to identify the underlying
                causes of building issues, ensuring our solutions address the
                root problems rather than just the symptoms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clipboard-list text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">
                2. Customized Solutions
              </h3>
              <p className="text-gray-600">
                Every building is unique. We develop tailored solutions that
                consider your specific requirements, building conditions, and
                budget constraints.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tools text-primary text-xl"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3">
                3. Quality Implementation
              </h3>
              <p className="text-gray-600">
                Our trained applicators use premium quality products and follow
                industry best practices to ensure high-quality workmanship and
                durable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                Our Team
              </p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Meet The Experts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team consists of trained professionals with extensive
              experience in building repair and maintenance. Led by{" "}
              {CONTACT.director}, we are committed to delivering exceptional
              results.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-span-1 md:col-span-5 bg-primary p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-20 -mr-20"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -mb-20 -ml-20"></div>

                  <div className="relative z-10">
                    <div className="w-32 h-32 mb-8 rounded-full mx-auto md:mx-0 relative overflow-hidden border-4 border-white/30">
                      <img
                        src={directorImage}
                        alt={CONTACT.director}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <h3 className="text-white font-montserrat font-bold text-2xl mb-2 text-center md:text-left">
                      {CONTACT.director}
                    </h3>
                    <p className="text-white/80 font-medium text-lg mb-4 text-center md:text-left">
                      {CONTACT.title}
                    </p>

                    <div className="w-20 h-1 bg-white/50 mb-6 mx-auto md:mx-0"></div>

                    <p className="text-white/80 mb-8 text-center md:text-left leading-relaxed">
                      Civil engineering expert with extensive experience in
                      building repair and waterproofing solutions. Leader of OM
                      Vinayaga Associates since its inception.
                    </p>

                    <div className="flex space-x-4 justify-center md:justify-start">
                      <a
                        href={`https://www.facebook.com/${CONTACT.social.facebook}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href={`https://twitter.com/${CONTACT.social.twitter}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/in/${CONTACT.director
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-7 p-8 md:p-10">
                  <h3 className="font-montserrat font-bold text-xl text-primary mb-6">
                    Leadership & Expertise
                  </h3>

                  <div className="space-y-8">
                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="fas fa-award"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-2">
                          Professional Qualifications
                        </h4>
                        <p className="text-gray-600">
                          Advanced degrees in Civil Engineering with
                          specializations in structural design and waterproofing
                          technologies. Certified Building Doctor franchise
                          owner with continuous training in the latest industry
                          innovations.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="fas fa-history"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-2">
                          Industry Experience
                        </h4>
                        <p className="text-gray-600">
                          Over 15 years of hands-on experience in the
                          construction and building repair industry across
                          various climatic conditions and building types.
                          Successfully led over 1000+ projects throughout Tamil
                          Nadu.
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                        <i className="fas fa-users"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-2">
                          Team Leadership
                        </h4>
                        <p className="text-gray-600">
                          Leads a team of 25+ skilled technicians, consultants,
                          and customer service professionals dedicated to
                          providing the highest quality building maintenance
                          solutions with personalized service.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      <i className="fas fa-envelope mr-2"></i> Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <i className="fas fa-tools text-2xl"></i>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  Technical Specialists
                </h3>
                <p className="text-gray-600">
                  Our team of technical specialists brings extensive knowledge
                  in waterproofing, structural repairs, and building
                  diagnostics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <i className="fas fa-drafting-compass text-2xl"></i>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  Repair Consultants
                </h3>
                <p className="text-gray-600">
                  Experienced consultants who assess building conditions and
                  develop customized solutions for long-lasting results.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <i className="fas fa-headset text-2xl"></i>
                </div>
                <h3 className="font-montserrat font-semibold text-xl mb-2">
                  Customer Support
                </h3>
                <p className="text-gray-600">
                  Dedicated support staff ensuring excellent communication and
                  service throughout your project lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl mb-6">
              Our Building Doctor Franchise
            </h2>
            <p className="text-gray-600 mb-8">
              Being a part of the Building Doctor network enables us to bring
              the latest technologies and proven solutions to Madurai. We
              combine the national expertise of Building Doctor with our local
              understanding to provide superior services.
            </p>
            <div className="aspect-video w-full mb-8 bg-gray-200 rounded-xl"></div>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutPage;
