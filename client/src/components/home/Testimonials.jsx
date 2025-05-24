import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary  uppercase tracking-wider">
              Happy Customers
            </p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by homeowners, businesses, and institutions across Madurai.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div
            className="transition-transform duration-500 flex"
            style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-user text-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas ${
                          i < Math.floor(testimonial.rating)
                            ? "fa-star"
                            : i < testimonial.rating
                            ? "fa-star-half-alt"
                            : "fa-star text-gray-300"
                        } text-yellow-400`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  {testimonial.hasVideo && (
                    <div className="text-primary font-medium text-sm cursor-pointer">
                      <i className="fas fa-play-circle mr-1"></i> Watch Video
                      Testimonial
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition z-10"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition z-10"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
