import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCustomerProducts } from "../../../hooks/useCustomerProducts";

const SimilarProducts = () => {
  const { products, loading } = useCustomerProducts();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isResetting = useRef(false);
  const autoScrollRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const repeatedProducts = [...products, ...products, ...products];

  const getOneSetWidth = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;
    return slider.scrollWidth / 3;
  };

  const moveToMiddle = () => {
    const slider = sliderRef.current;
    if (!slider || products.length === 0) return;

    slider.scrollLeft = getOneSetWidth();
  };

  const fixInfiniteScroll = () => {
    const slider = sliderRef.current;
    if (!slider || products.length === 0 || isResetting.current) return;

    const oneSetWidth = getOneSetWidth();

    if (slider.scrollLeft <= oneSetWidth * 0.5) {
      isResetting.current = true;
      slider.style.scrollBehavior = "auto";
      slider.scrollLeft += oneSetWidth;
      slider.style.scrollBehavior = "smooth";
      isResetting.current = false;
    }

    if (slider.scrollLeft >= oneSetWidth * 1.5) {
      isResetting.current = true;
      slider.style.scrollBehavior = "auto";
      slider.scrollLeft -= oneSetWidth;
      slider.style.scrollBehavior = "smooth";
      isResetting.current = false;
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();

    const autoScroll = () => {
      const slider = sliderRef.current;

      if (slider && products.length > 0) {
        slider.scrollLeft += 0.6;
        fixInfiniteScroll();
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll);
    };

    autoScrollRef.current = requestAnimationFrame(autoScroll);
  };

  const pauseThenResumeAutoScroll = () => {
    stopAutoScroll();

    resumeTimerRef.current = window.setTimeout(() => {
      startAutoScroll();
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      moveToMiddle();
      startAutoScroll();
    }, 100);

    window.addEventListener("resize", moveToMiddle);

    return () => {
      clearTimeout(timer);
      stopAutoScroll();
      window.removeEventListener("resize", moveToMiddle);
    };
  }, [products.length]);

  const scrollSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    pauseThenResumeAutoScroll();

    const gap = 20;
    const cardWidth = (slider.clientWidth - gap * 4) / 5;
    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    requestAnimationFrame(fixInfiniteScroll);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    const slider = sliderRef.current;
    if (!slider) return;

    pauseThenResumeAutoScroll();

    slider.scrollLeft += e.deltaY;
    fixInfiniteScroll();
  };

  if (loading) {
    return <p className="py-8 text-center text-gray-500">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="py-8 text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>

        <div className="flex gap-2">
          <button
            onClick={() => scrollSlider("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollSlider("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={pauseThenResumeAutoScroll}
        onTouchStart={pauseThenResumeAutoScroll}
        className="no-scrollbar w-full overflow-x-auto scroll-smooth"
      >
        <div className="flex gap-5">
          {repeatedProducts.map((product, index) => (
            <div
              key={`${product._id}-${index}`}
              className="shrink-0"
              style={{
                width: "calc((100% - 80px) / 5)",
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;