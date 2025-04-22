import { useState, useRef, useEffect, useCallback, memo } from "react";
import { BEFORE_AFTER } from "@/data/company";

// Optimized image component with lazy loading
const OptimizedImage = memo(({ src, alt, className, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  
  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };
  
  return (
    <>
      {!loaded && (
        <div className={`${className} bg-gray-200 animate-pulse`} />
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
      />
    </>
  );
});

const BeforeAfterSlider = memo(({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const sliderRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // Optimized drag handling with debounce
  const updateSliderPosition = useCallback((clientX) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const newPosition = ((clientX - sliderRect.left) / sliderRect.width) * 100;
    const clampedPosition = Math.min(100, Math.max(0, newPosition));
    
    if (debounceTimeoutRef.current) {
      cancelAnimationFrame(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = requestAnimationFrame(() => {
      setSliderPosition(clampedPosition);
    });
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMove = useCallback((clientX) => {
    if (isDragging) {
      updateSliderPosition(clientX);
    }
  }, [isDragging, updateSliderPosition]);

  const handleMouseMove = useCallback((e) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleClick = useCallback((e) => {
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleImageLoad = useCallback((type) => {
    setImagesLoaded(prev => ({ ...prev, [type]: true }));
  }, []);

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  // Event listeners with proper cleanup
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
      
      if (debounceTimeoutRef.current) {
        cancelAnimationFrame(debounceTimeoutRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp, handleTouchEnd]);

  return (
    <div 
      ref={sliderRef} 
      className="relative h-72 md:h-80 overflow-hidden rounded-lg cursor-pointer select-none" 
      onClick={handleClick}
      role="slider"
      aria-label={`Compare before and after ${title}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={sliderPosition}
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow keyboard navigation
        if (e.key === 'ArrowLeft') {
          setSliderPosition(prev => Math.max(0, prev - 5));
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          setSliderPosition(prev => Math.min(100, prev + 5));
          e.preventDefault();
        }
      }}
    >
      {/* Preload placeholder */}
      {!allImagesLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* After image - full width */}
      <div className={`absolute inset-0 w-full h-full ${allImagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <OptimizedImage 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover"
          onLoad={() => handleImageLoad('after')}
        />
      </div>
      
      {/* Before image - partial width based on slider position */}
      <div 
        className={`absolute inset-0 h-full overflow-hidden ${allImagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ width: `${sliderPosition}%` }}
      >
        <OptimizedImage 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => handleImageLoad('before')}
        />
      </div>
      
      {/* Slider handle */}
      <div 
        className={`absolute top-0 bottom-0 w-0.5 md:w-1 bg-white shadow-md cursor-ew-resize z-20 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border-2 border-white shadow-lg">
          <div className="flex justify-center items-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className={`absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded z-10 transform transition-all duration-300 ${allImagesLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>BEFORE</div>
      <div className={`absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded z-10 transform transition-all duration-300 ${allImagesLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>AFTER</div>
    </div>
  );
});

const BeforeAfter = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-white uppercase tracking-wider">Our Results</p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">See The <span className="text-primary">Transformation</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Real projects showcasing the dramatic improvements our solutions can achieve for your property.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {BEFORE_AFTER.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-montserrat font-semibold text-xl mb-4">{project.title}</h3>
              <BeforeAfterSlider 
                beforeImage={project.beforeImage} 
                afterImage={project.afterImage} 
                title={project.title}
              />
              <p className="text-gray-600 mt-4">{project.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition transform hover:scale-105 active:scale-95"
          >
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;