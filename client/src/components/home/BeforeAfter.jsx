import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  Suspense,
  lazy,
} from "react";
import { BEFORE_AFTER } from "@/data/company";
import { AlertTriangle } from "lucide-react";

// Optimized image component with progressive loading and preload capability
const OptimizedImage = memo(
  ({ src, alt, className, onLoad, priority = false }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef(null);

    const handleLoad = () => {
      setLoaded(true);
      setError(false);
      if (onLoad) onLoad();
    };

    const handleError = () => {
      setError(true);
      console.error(`Failed to load image: ${src}`);
      // We still call onLoad to prevent blocking the UI
      if (onLoad) onLoad();
    };

    // Preload images if marked as priority
    useEffect(() => {
      if (priority && src) {
        const img = new Image();
        img.src = src;
      }
    }, [src, priority]);

    // Use IntersectionObserver for better lazy loading
    useEffect(() => {
      if (!imgRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Set the real source only when in viewport
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "200px" }
      ); // Load when within 200px of viewport

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, []);

    // For debugging in production
    useEffect(() => {
      console.log(`Loading image: ${src}`);
      if (typeof src !== "string" && src) {
        console.log(`Image object:`, src);
      }
    }, [src]);

    return (
      <>
        {!loaded && !error && <div className={`${className} bg-gray-50`} />}

        {error ? (
          <div
            className={`${className} bg-gray-100 flex items-center justify-center`}
          >
            <div className="flex flex-col items-center justify-center text-gray-500">
              <AlertTriangle className="h-8 w-8 mb-2" />
              <p className="text-xs text-center">Image unavailable</p>
            </div>
          </div>
        ) : (
          <img
            ref={imgRef}
            src={priority ? src : ""}
            data-src={!priority ? src : ""}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={`${className} ${
              loaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </>
    );
  }
);

const BeforeAfterSlider = memo(({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    before: false,
    after: false,
  });
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

  const handleMove = useCallback(
    (clientX) => {
      if (isDragging) {
        updateSliderPosition(clientX);
      }
    },
    [isDragging, updateSliderPosition]
  );

  const handleMouseMove = useCallback(
    (e) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    [handleMove]
  );

  const handleClick = useCallback(
    (e) => {
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition]
  );

  const handleImageLoad = useCallback((type) => {
    setImagesLoaded((prev) => ({ ...prev, [type]: true }));
  }, []);

  const allImagesLoaded = imagesLoaded.before && imagesLoaded.after;

  // Event listeners with proper cleanup
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);

      if (debounceTimeoutRef.current) {
        cancelAnimationFrame(debounceTimeoutRef.current);
      }
    };
  }, [
    isDragging,
    handleMouseMove,
    handleTouchMove,
    handleMouseUp,
    handleTouchEnd,
  ]);

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
        if (e.key === "ArrowLeft") {
          setSliderPosition((prev) => Math.max(0, prev - 5));
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          setSliderPosition((prev) => Math.min(100, prev + 5));
          e.preventDefault();
        }
      }}
    >
      {/* Suspense wrapper with fade-in transition instead of spinning loader */}
      <Suspense
        fallback={
          <div className="absolute inset-0 w-full h-full bg-gray-50/80"></div>
        }
      >
        {/* Images Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* After image (background) - full width always visible */}
          <div
            className={`absolute inset-0 w-full h-full ${
              allImagesLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <OptimizedImage
              src={afterImage}
              alt="After"
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad("after")}
              priority={true}
            />
          </div>

          {/* Before image with clip-path for dynamic reveal */}
          <div
            className={`absolute inset-0 w-full h-full ${
              allImagesLoaded ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              transition: isDragging ? "none" : "clip-path 0.1s ease-out",
            }}
          >
            <OptimizedImage
              src={beforeImage}
              alt="Before"
              className="w-full h-full object-cover"
              onLoad={() => handleImageLoad("before")}
              priority={true}
            />
          </div>
        </div>
      </Suspense>

      {/* Slider handle with line */}
      <div
        className={`absolute top-0 bottom-0 flex items-center justify-center cursor-ew-resize z-30 ${
          allImagesLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        style={{
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          width: "40px",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Vertical divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 md:w-1 bg-white shadow-md h-full"></div>

        {/* Handle circle with arrows */}
        <div className="relative w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <div className="flex items-center justify-between w-4 md:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Animated pulse effect for better visibility */}
          <span
            className="absolute w-full h-full rounded-full bg-primary/40 animate-ping opacity-75"
            style={{ animationDuration: "3s" }}
          ></span>
        </div>
      </div>

      {/* Enhanced Labels with visual cues */}
      <div
        className={`absolute top-4 left-4 bg-primary text-white text-xs px-2 py-1 rounded z-10 transform transition-all duration-300 ${
          allImagesLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
        style={{ maxWidth: `${sliderPosition - 5}%` }}
      >
        <span className="flex items-center">
          <span className="mr-1 font-semibold">BEFORE</span>
          {sliderPosition < 30 && (
            <span className="animate-pulse">&#x2190;</span>
          )}
        </span>
      </div>

      <div
        className={`absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded z-10 transform transition-all duration-300 ${
          allImagesLoaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
        style={{ maxWidth: `${100 - sliderPosition - 5}%` }}
      >
        <span className="flex items-center">
          {sliderPosition > 70 && (
            <span className="animate-pulse mr-1">&#x2192;</span>
          )}
          <span className="font-semibold">AFTER</span>
        </span>
      </div>

      {/* Interactive hint that appears briefly on load */}
      <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs md:text-sm px-3 py-2 rounded-full z-30 transition-all duration-700 flex items-center hint-message ${
          allImagesLoaded
            ? "opacity-80 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{
          maxWidth: "80%",
          animation: allImagesLoaded ? "fadeInOut 3s forwards 1s" : "none",
        }}
      >
        <span className="mr-2">&#8596;</span>
        <span>Drag slider to compare before & after</span>
      </div>
    </div>
  );
});

// Wrapper component for optimization through code splitting
const BeforeAfterProject = memo(({ project }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="font-montserrat font-semibold text-xl mb-4">
        {project.title}
      </h3>
      <BeforeAfterSlider
        beforeImage={project.beforeImage}
        afterImage={project.afterImage}
        title={project.title}
      />
      <p className="text-gray-600 mt-4">{project.description}</p>
    </div>
  );
});

const BeforeAfter = () => {
  // Prefetch images to improve perceived performance
  useEffect(() => {
    // Preload first two project images (most visible) immediately
    const preloadHighPriority = () => {
      if (BEFORE_AFTER.length === 0) return;

      // Preload first project images
      if (BEFORE_AFTER[0]) {
        const beforeImg = new Image();
        const afterImg = new Image();
        beforeImg.src = BEFORE_AFTER[0].beforeImage;
        afterImg.src = BEFORE_AFTER[0].afterImage;
      }

      // Preload second project images if available
      if (BEFORE_AFTER[1]) {
        setTimeout(() => {
          const beforeImg = new Image();
          const afterImg = new Image();
          beforeImg.src = BEFORE_AFTER[1].beforeImage;
          afterImg.src = BEFORE_AFTER[1].afterImage;
        }, 300); // Small delay to prioritize first project
      }
    };

    // Start preloading immediately
    preloadHighPriority();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-primary bg-opacity-10 rounded-full mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">
              Our Results
            </p>
          </div>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
            See The <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real projects showcasing the dramatic improvements our solutions can
            achieve for your property.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 min-h-[400px]">
              <div className="bg-white/60 p-6 rounded-xl shadow animate-pulse h-[350px]"></div>
              <div className="bg-white/60 p-6 rounded-xl shadow animate-pulse h-[350px]"></div>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 content-visibility-auto">
            {BEFORE_AFTER.map((project) => (
              <BeforeAfterProject key={project.id} project={project} />
            ))}
          </div>
        </Suspense>

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
