import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Header from "../Home/CustomerHeader";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

import ProductCard from "../Product/ProductCard";
import SearchPagination from "./SearchPagination";

import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
import { useCustomerProducts } from "../../../hooks/useCustomerProducts";

const SearchPage = () => {
  const { setActivePage, setSearch } = useCustomerNavigation();
  const [searchParams] = useSearchParams();
  const {
    allProducts,
    categoryProducts,
    searchLoading,
    page,
    totalPages,
    totalProducts,
    message,
    setPage,
  } = useCustomerProducts();
  const [filterOpen, setFilterOpen] = useState(false);
  console.log("Total Pages:", totalPages);
  console.log("Products:", allProducts.length);


  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearch(query);
    }
  }, [searchParams, setSearch]);

  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      <Header
        setActivePage={setActivePage}
        onFilterClick={() => setFilterOpen((prev) => !prev)} />

      <Navbar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />

      <div className="space-y-8 p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Search Results
            </h2>

            <p className="text-sm text-gray-500">
              {totalProducts} Products
            </p>
          </div>

          {searchLoading ? (
            <div className="flex justify-center py-20">
              <p className="text-lg font-medium text-gray-500">
                Loading Products...
              </p>
            </div>
          ) : (
            <>
              {message && (
                <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
                  <p className="font-medium text-orange-700">
                    {message}
                  </p>
                </div>
              )}

              {allProducts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {allProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <SearchPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
                </>
              )}

              {categoryProducts.length > 0 && (
                <>
                  <div className="mt-14 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Similar Products
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Explore more products from the same category.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                </>
              )}

              {!message &&
                allProducts.length === 0 &&
                categoryProducts.length === 0 && (
                  <div className="flex justify-center py-20">
                    <p className="text-lg font-medium text-gray-500">
                      No Products Found
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;