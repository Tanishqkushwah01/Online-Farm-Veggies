import Header from "../components/layouts/Farmer/Header";
import ProductCard from "../components/layouts/Farmer/ProductCard";
import Sidebar from "../components/layouts/Farmer/Sidebar";
import Potato from "../assets/images/patato.png";

const FarmerDashboard = () => {
  return (
    <div className="h-screen w-screen overflow-hidden border-10 border-white">
      <div className="h-full w-full flex rounded-md bg-[#F1F1F1] overflow-hidden">

        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header username="Tanishq kushwah" />

          <main className="flex-1 bg-green-600 p-6 overflow-auto rounded-md">
            <div className="grid grid-cols-4 gap-4">
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
              <ProductCard image={Potato} name="Potato" price={34243} farm="farms" rating={123} reviews={4.5} />
            </div>
          </main>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;