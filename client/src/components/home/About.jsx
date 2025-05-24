import { Link } from "wouter";
import { CONTACT } from "@/lib/constants";
import directorImage from "@/assets/jeyaram.jpg";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">About Us</p>
            </div>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
              Madurai's Trusted <span className="text-primary">Building Repair Experts</span>
            </h2>
            <p className="text-gray-600 mb-4">
              OM Vinayaga Associates is an authorized franchise of Building Doctor, bringing professional building repair and maintenance solutions to Madurai and surrounding areas.
            </p>
            <p className="text-gray-600 mb-6">
              With a strong foundation in technical expertise and customer service, we have established ourselves as the go-to specialists for waterproofing, structural repairs, and construction chemicals in the region.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-1">Our Mission</h3>
                  <p className="text-gray-600">
                    To provide high-quality, affordable building repair solutions that enhance the longevity and value of our customers' properties.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-check text-white"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-1">Our Approach</h3>
                  <p className="text-gray-600">
                    We combine technical expertise with personalized service, ensuring each project receives the attention to detail it deserves.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition text-center">
                Contact Us
              </Link>
              <Link to="/services" className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium transition border border-primary text-center">
                Our Services
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-4 rounded-xl shadow-xl relative z-20 overflow-hidden">
              <img 
                src={directorImage} 
                alt={CONTACT.director}
                className="w-full h-[400px] rounded-lg object-cover object-top"
              />
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
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-3">
              Meet Our <span className="text-primary">Leadership</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The experienced professionals behind OM Vinayaga Associates.
            </p>
          </div>

          <div className="relative">
            <div className="bg-primary/5 absolute -inset-4 rounded-3xl -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              <div className="col-span-1 md:col-span-1">
                <div className="relative bg-white shadow-xl rounded-xl overflow-hidden h-full transform hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full"></div>

                  <div className="relative z-10 p-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-6 relative overflow-hidden border-4 border-white shadow-md">
                      <img 
                        src={directorImage} 
                        alt={CONTACT.director}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="font-montserrat font-bold text-xl text-gray-800">{CONTACT.director}</h3>
                      <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">{CONTACT.title}</p>
                      <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
                      <p className="text-gray-600 text-sm">
                        Civil engineering expert with over 10 years of experience in building repair and waterproofing solutions. Leads our technical team with a vision for excellence and innovation.
                      </p>
                    </div>

                    <div className="flex justify-center space-x-3">
                      <a
                        href={`https://www.facebook.com/${CONTACT.social.facebook}`}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition"
                      >
                        <i className="fab fa-facebook-f text-white"></i>
                      </a>
                      <a
                        href={`https://twitter.com/${CONTACT.social.twitter}`}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition"
                      >
                        <i className="fab fa-twitter text-white"></i>
                      </a>
                      <a
                        href={`https://www.linkedin.com/in/${CONTACT.director.toLowerCase().replace(/\s+/g, "-")}`}
                        className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition"
                      >
                        <i className="fab fa-linkedin-in text-white"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="bg-white shadow-xl rounded-xl overflow-hidden h-full p-8">
                  <h3 className="font-montserrat font-bold text-xl text-primary mb-4">Our Expert Team</h3>
                  <p className="text-gray-600 mb-6">
                    Behind our success is a team of dedicated professionals who are experts in their respective domains. Our team includes:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                        <i className="fas fa-hard-hat text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-1">Technical Consultants</h4>
                        <p className="text-gray-600 text-sm">
                          Experienced civil engineers providing in-depth analysis and solutions for complex building problems.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                        <i className="fas fa-tools text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-1">Application Specialists</h4>
                        <p className="text-gray-600 text-sm">
                          Skilled professionals trained in the correct application of our specialized products.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                        <i className="fas fa-user-tie text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-1">Project Managers</h4>
                        <p className="text-gray-600 text-sm">
                          Dedicated professionals ensuring timely completion and quality control of all projects.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
                        <i className="fas fa-headset text-white"></i>
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-gray-800 mb-1">Customer Support</h4>
                        <p className="text-gray-600 text-sm">
                          Responsive team providing ongoing support and guidance for all your building maintenance needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                      Together, we bring a combined experience of over 50 years in the building repair and maintenance industry, dedicated to delivering excellence on every project.
                    </p>
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