// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import sliderImage1 from "../../../../assets/images/sliderImage1.jpeg";
// import sliderImage2 from "../../../../assets/images/sliderImage2.jpeg";
// import sliderImage3 from "../../../../assets/images/sliderImage3.jpeg";



// const slides = [
//   {
//     image:sliderImage1,
//     // image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",

//     title: "Fresh Vegetables",
//     subtitle: "Farm fresh vegetables delivered to your doorstep.",
//   },
//   {
//     image: sliderImage2,
//     // image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600",
//     title: "Organic Fruits",
//     subtitle: "Healthy, juicy and naturally grown fruits.",
//   },
//   {
//     image: sliderImage3,
//     // image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1600",
//     title: "Direct From Farmers",
//     subtitle: "Support local farmers with every purchase.",
//   },
// ];

// // Clone first slide
// const sliderData = [...slides, slides[0]];

// export default function Slider() {
//   const [current, setCurrent] = useState(0);
//   const [transition, setTransition] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [current]);

//   const nextSlide = () => {
//     setCurrent((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     if (current === 0) {
//       setTransition(false);
//       setCurrent(slides.length);

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           setTransition(true);
//           setCurrent(slides.length - 1);
//         });
//       });
//     } else {
//       setCurrent((prev) => prev - 1);
//     }
//   };

//   const handleTransitionEnd = () => {
//     if (current === slides.length) {
//       setTransition(false);
//       setCurrent(0);

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           setTransition(true);
//         });
//       });
//     }
//   };

//   return (
//     <div className="relative w-full h-105 rounded-3xl overflow-hidden shadow-xl group">

//       <div
//         onTransitionEnd={handleTransitionEnd}
//         className={`flex h-full ${transition
//           ? "transition-transform duration-700 ease-in-out"
//           : ""
//           }`}
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {sliderData.map((slide, index) => (
//           <div key={index} className="min-w-full h-full relative">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />

//             <div className="absolute inset-0 bg-black/45" />

//             <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
//               <h1 className="text-5xl font-bold max-w-xl">
//                 {slide.title}
//               </h1>

//               <p className="mt-5 text-xl max-w-lg text-gray-100">
//                 {slide.subtitle}
//               </p>

//               <button className="mt-8 w-fit px-8 py-3 bg-green-600 rounded-xl hover:bg-green-700 transition font-semibold cursor-pointer">
//                 Shop Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Previous */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
//       >
//         <ChevronLeft size={28} />
//       </button>

//       {/* Next */}
//       <button
//         onClick={nextSlide}
//         className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
//       >
//         <ChevronRight size={28} />
//       </button>

//       {/* Dots */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setTransition(true);
//               setCurrent(index);
//             }}
//             className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${(current === index ||
//               (current === slides.length && index === 0))
//               ? "bg-green-500 w-10"
//               : "bg-white w-3"
//               }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sliderImage1 from "../../../../assets/images/sliderImage1.jpeg";
import sliderImage2 from "../../../../assets/images/sliderImage2.jpeg";
import sliderImage3 from "../../../../assets/images/sliderImage3.jpeg";

const slides = [
  {
    image: sliderImage1,
    title: "Fresh Vegetables",
    subtitle:
      "Farm fresh vegetables delivered to your doorstep.",
  },
  {
    image: sliderImage2,
    title: "Organic Fruits",
    subtitle:
      "Healthy, juicy and naturally grown fruits.",
  },
  {
    image: sliderImage3,
    title: "Direct From Farmers",
    subtitle:
      "Support local farmers with every purchase.",
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
    <div className="group relative h-72 w-full overflow-hidden rounded-3xl shadow-xl transition-colors duration-200 sm:h-88 md:h-96 lg:h-105 dark:shadow-black/30">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${
          transition
            ? "transition-transform duration-700 ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="relative h-full min-w-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="absolute inset-0 flex flex-col justify-center px-6 text-white sm:px-10 md:px-12 lg:px-16">
              <h1 className="max-w-xl wrap-break-word text-3xl font-bold sm:text-4xl md:text-5xl">
                {slide.title}
              </h1>

              <p className="mt-4 max-w-lg wrap-break-word text-base text-gray-100 sm:mt-5 sm:text-lg md:text-xl">
                {slide.subtitle}
              </p>

              <button className="mt-6 w-fit cursor-pointer rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 sm:mt-8">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Previous */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2.5 shadow-lg transition hover:bg-white sm:left-5 sm:p-3"
      >
        <ChevronLeft
          size={24}
          className="text-gray-800 sm:h-7 sm:w-7"
        />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2.5 shadow-lg transition hover:bg-white sm:right-5 sm:p-3"
      >
        <ChevronRight
          size={24}
          className="text-gray-800 sm:h-7 sm:w-7"
        />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setTransition(true);
              setCurrent(index);
            }}
            className={`h-3 cursor-pointer rounded-full transition-all duration-300 ${
              current === index ||
              (current === slides.length && index === 0)
                ? "w-8 bg-green-500 sm:w-10"
                : "w-3 bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}