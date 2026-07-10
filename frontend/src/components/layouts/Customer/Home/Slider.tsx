import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sliderImage1 from "../../../../assets/images/sliderImage1.jpeg";
import sliderImage2 from "../../../../assets/images/sliderImage2.jpeg";
import sliderImage3 from "../../../../assets/images/sliderImage3.jpeg";


// "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
// "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600",
// "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600",



const slides = [
  {
    image:sliderImage1,
    // image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",

    title: "Fresh Vegetables",
    subtitle: "Farm fresh vegetables delivered to your doorstep.",
  },
  {
    image: sliderImage2,
    // image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600",
    title: "Organic Fruits",
    subtitle: "Healthy, juicy and naturally grown fruits.",
  },
  {
    image: sliderImage3,
    // image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600",
    title: "Direct From Farmers",
    subtitle: "Support local farmers with every purchase.",
  },
];

// Clone first slide
const sliderData = [...slides, slides[0]];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current === 0) {
      setTransition(false);
      setCurrent(slides.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
          setCurrent(slides.length - 1);
        });
      });
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (current === slides.length) {
      setTransition(false);
      setCurrent(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  };

  return (
    <div className="relative w-full h-105 rounded-3xl overflow-hidden shadow-xl group">

      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${transition
          ? "transition-transform duration-700 ease-in-out"
          : ""
          }`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
              <h1 className="text-5xl font-bold max-w-xl">
                {slide.title}
              </h1>

              <p className="mt-5 text-xl max-w-lg text-gray-100">
                {slide.subtitle}
              </p>

              <button className="mt-8 w-fit px-8 py-3 bg-green-600 rounded-xl hover:bg-green-700 transition font-semibold cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setTransition(true);
              setCurrent(index);
            }}
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${(current === index ||
              (current === slides.length && index === 0))
              ? "bg-green-500 w-10"
              : "bg-white w-3"
              }`}
          />
        ))}
      </div>
    </div>
  );
}