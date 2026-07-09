import { ArrowRight, Leaf, ShoppingBasket, Truck } from "lucide-react";
import useWebNavigate from "../components/hooks/useWebNavigate";

const Home = () => {
  const {gotoRegister,gotoLogin}=useWebNavigate();
  return (
    <div className="min-h-screen bg-[#F8FAF5]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600" size={30} />
          <h1 className="text-2xl font-bold text-green-700">
            FarmFresh
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-green-600">
            Home
          </a>
          <a href="#features" className="hover:text-green-600">
            Features
          </a>
          <a href="#products" className="hover:text-green-600">
            Products
          </a>
          <a href="#contact" className="hover:text-green-600">
            Contact
          </a>
        </div>

        <button onClick={gotoLogin} className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
          Login
        </button>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-16 py-16 gap-10"
      >
        <div>
          <p className="text-green-600 font-semibold mb-3">
            Fresh Vegetables Direct From Farm
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Buy Fresh & Organic Farm Products
          </h2>

          <p className="text-gray-600 mt-5 text-lg max-w-xl">
            Get fresh vegetables, fruits, and organic farm products directly
            from local farmers at the best price.
          </p>

          <div className="flex gap-4 mt-8">
            <button onClick={gotoLogin} className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
              Shop Now <ArrowRight size={20} />
            </button>

            <button onClick={gotoRegister} className="border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-50 transition">
              Explore
            </button>
          </div>
        </div>

        <div className="bg-green-100 rounded-3xl p-6 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
            alt="Fresh vegetables"
            className="rounded-3xl w-full max-h-105 object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-8 md:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <Leaf className="text-green-600 mb-4" size={36} />
          <h3 className="text-xl font-bold text-gray-900">
            Organic Products
          </h3>
          <p className="text-gray-600 mt-2">
            Fresh and chemical-free products directly from trusted farmers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <ShoppingBasket className="text-green-600 mb-4" size={36} />
          <h3 className="text-xl font-bold text-gray-900">
            Easy Ordering
          </h3>
          <p className="text-gray-600 mt-2">
            Customers can easily browse products and place orders online.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <Truck className="text-green-600 mb-4" size={36} />
          <h3 className="text-xl font-bold text-gray-900">
            Fast Delivery
          </h3>
          <p className="text-gray-600 mt-2">
            Fresh farm products delivered quickly to your doorstep.
          </p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-8 md:px-16 py-16">
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold">Our Products</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Fresh From The Farm
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Tomato", "Potato", "Carrot", "Cabbage"].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
                alt={item}
                className="h-40 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{item}</h3>
                <p className="text-gray-600 mt-1">Fresh organic vegetable</p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-8 md:mx-16 my-16 bg-green-700 rounded-3xl p-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Buying Fresh Farm Products Today
        </h2>

        <p className="mt-3 text-green-100">
          Connect with local farmers and get fresh products at fair prices.
        </p>

        <button onClick={gotoRegister} className="mt-6 bg-white text-green-700 px-7 py-3 rounded-full font-semibold hover:bg-green-50 transition">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-6 text-gray-600">
        © 2026 FarmFresh. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;