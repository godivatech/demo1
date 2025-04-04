import { useState, useRef, useEffect } from "react";
import { BEFORE_AFTER } from "@/lib/constants";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage }: SliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMove = (clientX: number) => {
    if (isDragging && sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const newPosition = ((clientX - sliderRect.left) / sliderRect.width) * 100;
      setSliderPosition(Math.min(100, Math.max(0, newPosition)));
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      setSliderPosition(Math.min(100, Math.max(0, newPosition)));
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={sliderRef} 
      className="relative h-72 overflow-hidden rounded-lg cursor-pointer" 
      onClick={handleClick}
    >
      {/* After image - full width */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full bg-gray-400"></div>
      </div>
      
      {/* Before image - partial width based on slider position */}
      <div 
        className="absolute inset-0 h-full overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="absolute inset-0 w-full h-full bg-gray-600"></div>
      </div>
      
      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute w-8 h-8 rounded-full bg-primary top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-2 border-white">
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded z-10">BEFORE</div>
      <div className="absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">AFTER</div>
    </div>
  );
};

const BeforeAfter = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Results</p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">See The <span className="text-primary">Transformation</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Real projects showcasing the dramatic improvements our solutions can achieve for your property.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {BEFORE_AFTER.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-montserrat font-semibold text-xl mb-4">{project.title}</h3>
              <BeforeAfterSlider beforeImage={project.beforeImage} afterImage={project.afterImage} />
              <p className="text-gray-600 mt-4">{project.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition">
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
