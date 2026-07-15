// // import { useMemo, useState } from "react";
// // import { SlidersHorizontal, X } from "lucide-react";
// // import Select from "react-select";
// // import { City } from "country-state-city";

// // import { useCustomerProducts } from "../../../hooks/useCustomerProducts";


// // type NavbarProps = {
// //   filterOpen: boolean;
// //   setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // };


// // type Option = {
// //   value: string;
// //   label: string;
// // };



// // const customSelectStyles = {
// //   control: (base: any, state: any) => ({
// //     ...base,
// //     minHeight: "46px",
// //     borderRadius: "14px",
// //     borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
// //     backgroundColor: "#f9fafb",
// //     boxShadow: state.isFocused
// //       ? "0 0 0 3px rgba(34,197,94,0.15)"
// //       : "none",
// //     cursor: "pointer",
// //     fontSize: "14px",
// //     "&:hover": {
// //       borderColor: "#86efac",
// //     },
// //   }),

// //   option: (base: any, state: any) => ({
// //     ...base,
// //     backgroundColor: state.isSelected
// //       ? "#16a34a"
// //       : state.isFocused
// //         ? "#d1d5db"
// //         : "white",
// //     color: state.isSelected ? "white" : "#111827",
// //     cursor: "pointer",
// //     padding: "10px 14px",

// //     ":active": {
// //       backgroundColor: state.isSelected
// //         ? "#16a34a"
// //         : "#d1d5db",
// //     },
// //   }),

// //   menu: (base: any) => ({
// //     ...base,
// //     borderRadius: "14px",
// //     overflow: "hidden",
// //     zIndex: 9999,
// //   }),

// //   indicatorSeparator: () => ({
// //     display: "none",
// //   }),
// // };



// // const categoryOptions: Option[] = [
// //   {
// //     value: "",
// //     label: "Category",
// //   },

// //   {
// //     value: "Vegetables",
// //     label: "Vegetables",
// //   },

// //   {
// //     value: "Fruits",
// //     label: "Fruits",
// //   },

// //   {
// //     value: "Grains",
// //     label: "Grains",
// //   },
// // ];



// // const priceOptions: Option[] = [
// //   {
// //     value: "",
// //     label: "Price",
// //   },

// //   {
// //     value: "lowToHigh",
// //     label: "Low → High",
// //   },

// //   {
// //     value: "highToLow",
// //     label: "High → Low",
// //   },
// // ];





// // const Navbar = ({ filterOpen, setFilterOpen }: NavbarProps) => {



// //   const { setCategory, setLocation, setPrice, setPage, } = useCustomerProducts();




// //   const [cityInput, setCityInput] = useState("");



// //   const [selectedCity, setSelectedCity] =
// //     useState<Option | null>(null);



// //   const [selectedCategory, setSelectedCategory] =
// //     useState<Option | null>(
// //       categoryOptions[0]
// //     );



// //   const [selectedPrice, setSelectedPrice] =
// //     useState<Option | null>(
// //       priceOptions[0]
// //     );







// //   const allCityOptions: Option[] = useMemo(() => {


// //     const cities =
// //       City.getCitiesOfCountry("IN") || [];



// //     return cities.map((city) => ({

// //       value:
// //         `${city.name}, ${city.stateCode}, India`,

// //       label:
// //         `${city.name}, ${city.stateCode}, India`,
// //     }));


// //   }, []);








// //   const filteredCityOptions = useMemo(() => {


// //     if (cityInput.trim().length < 2)
// //       return [];



// //     return allCityOptions

// //       .filter((city) =>

// //         city.label
// //           .toLowerCase()
// //           .includes(
// //             cityInput.toLowerCase()
// //           )

// //       )

// //       .slice(0, 50);



// //   }, [
// //     cityInput,
// //     allCityOptions
// //   ]);








// //   const handleFilter = () => {


// //     setLocation(
// //       selectedCity?.value ||
// //       "All Location"
// //     );



// //     setCategory(
// //       selectedCategory?.value ||
// //       "All Category"
// //     );



// //     setPrice(
// //       selectedPrice?.value ||
// //       ""
// //     );



// //     // pagination reset
// //     setPage(1);



// //   };









// //   return (

// //     <div

// //       className={`w-full overflow-visible bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${filterOpen
// //         ?
// //         "max-h-40 opacity-100 py-2"
// //         :
// //         "max-h-0 opacity-0 py-0 border-b-0"
// //         }`}

// //     >


// //       <nav className="w-full px-6">


// //         <div className="flex items-center justify-between flex-wrap gap-3">



// //           <div className="flex items-center gap-2">


// //             <SlidersHorizontal

// //               size={20}

// //               className="text-green-600"

// //             />



// //             <h2 className="text-lg font-semibold text-green-700">

// //               Filters

// //             </h2>


// //           </div>






// //           <div className="flex items-center gap-2 flex-wrap">







// //             <div className="w-64">


// //               <Select<Option, false>

// //                 options={filteredCityOptions}

// //                 value={selectedCity}


// //                 onInputChange={(value, action) => {


// //                   if (action.action === "input-change") {

// //                     setCityInput(value);

// //                   }


// //                 }}



// //                 onChange={(selected) => {


// //                   setSelectedCity(selected);

// //                   setCityInput(
// //                     selected?.label || ""
// //                   );


// //                 }}



// //                 placeholder="Location"

// //                 isSearchable

// //                 styles={customSelectStyles}



// //                 noOptionsMessage={() =>


// //                   cityInput.trim().length < 2

// //                     ?

// //                     "Type at least 2 letters"

// //                     :

// //                     "No city found"


// //                 }


// //               />



// //             </div>

// //             <div className="w-44">


// //               <Select<Option, false>

// //                 options={categoryOptions}

// //                 value={selectedCategory}


// //                 onChange={(selected) =>

// //                   setSelectedCategory(selected)

// //                 }


// //                 styles={customSelectStyles}

// //                 isSearchable={false}

// //               />


// //             </div>

// //             <div className="w-40">


// //               <Select<Option, false>

// //                 options={priceOptions}

// //                 value={selectedPrice}


// //                 onChange={(selected) =>

// //                   setSelectedPrice(selected)

// //                 }


// //                 styles={customSelectStyles}

// //                 isSearchable={false}

// //               />


// //             </div>

// //             <button

// //               onClick={handleFilter}

// //               className="h-11.5 px-5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition cursor-pointer"

// //             >

// //               Apply

// //             </button>

// //             <button
// //               onClick={() =>                 setFilterOpen(false)              }
// //               className="h-11.5 w-11.5 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition cursor-pointer"
// //             >
// //               <X size={18} className="text-red-500" />
// //             </button>
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import { useMemo, useState } from "react";
// import { SlidersHorizontal, X } from "lucide-react";
// import Select from "react-select";
// import { City } from "country-state-city";
// import { useLocation } from "react-router-dom";

// import { useCustomerProducts } from "../../../hooks/useCustomerProducts";
// import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";


// type NavbarProps = {
//   filterOpen: boolean;
//   setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };


// type Option = {
//   value: string;
//   label: string;
// };



// const customSelectStyles = {
//   control: (base: any, state: any) => ({
//     ...base,
//     minHeight: "46px",
//     borderRadius: "14px",
//     borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
//     backgroundColor: "#f9fafb",
//     boxShadow: state.isFocused
//       ? "0 0 0 3px rgba(34,197,94,0.15)"
//       : "none",
//     cursor: "pointer",
//     fontSize: "14px",
//     "&:hover": {
//       borderColor: "#86efac",
//     },
//   }),

//   option: (base: any, state: any) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? "#16a34a"
//       : state.isFocused
//         ? "#d1d5db"
//         : "white",
//     color: state.isSelected ? "white" : "#111827",
//     cursor: "pointer",
//     padding: "10px 14px",

//     ":active": {
//       backgroundColor: state.isSelected
//         ? "#16a34a"
//         : "#d1d5db",
//     },
//   }),

//   menu: (base: any) => ({
//     ...base,
//     borderRadius: "14px",
//     overflow: "hidden",
//     zIndex: 9999,
//   }),

//   indicatorSeparator: () => ({
//     display: "none",
//   }),
// };



// const categoryOptions: Option[] = [
//   {
//     value: "",
//     label: "Category",
//   },
//   {
//     value: "Vegetables",
//     label: "Vegetables",
//   },
//   {
//     value: "Fruits",
//     label: "Fruits",
//   },
//   {
//     value: "Grains",
//     label: "Grains",
//   },
// ];



// const priceOptions: Option[] = [
//   {
//     value: "",
//     label: "Price",
//   },
//   {
//     value: "lowToHigh",
//     label: "Low → High",
//   },
//   {
//     value: "highToLow",
//     label: "High → Low",
//   },
// ];





// const Navbar = ({
//   filterOpen,
//   setFilterOpen,
// }: NavbarProps) => {



//   const {
//     setCategory,
//     setLocation,
//     setPrice,
//     setPage,
//   } = useCustomerProducts();



//   const {    activePage  } = useCustomerNavigation();



//   const routerLocation = useLocation();



//   const disableLocationPrice =
//     activePage === "orders"
//     ||
//     routerLocation.pathname.includes("/customer/farmer/");





//   const [cityInput, setCityInput] = useState("");



//   const [selectedCity, setSelectedCity] =
//     useState<Option | null>(null);



//   const [selectedCategory, setSelectedCategory] =
//     useState<Option | null>(
//       categoryOptions[0]
//     );



//   const [selectedPrice, setSelectedPrice] =
//     useState<Option | null>(
//       priceOptions[0]
//     );






//   const allCityOptions: Option[] = useMemo(() => {


//     const cities =
//       City.getCitiesOfCountry("IN") || [];



//     return cities.map((city) => ({

//       value:
//         `${city.name}, ${city.stateCode}, India`,

//       label:
//         `${city.name}, ${city.stateCode}, India`,

//     }));


//   }, []);






//   const filteredCityOptions = useMemo(() => {


//     if (cityInput.trim().length < 2)
//       return [];



//     return allCityOptions

//       .filter((city) =>

//         city.label
//           .toLowerCase()
//           .includes(
//             cityInput.toLowerCase()
//           )

//       )

//       .slice(0, 50);



//   }, [
//     cityInput,
//     allCityOptions
//   ]);







//   const handleFilter = () => {



//     if (!disableLocationPrice) {

//       setLocation(
//         selectedCity?.value ||
//         "All Location"
//       );


//       setPrice(
//         selectedPrice?.value ||
//         ""
//       );

//     }



//     setCategory(
//       selectedCategory?.value ||
//       "All Category"
//     );



//     setPage(1);


//   };






//   const resetFilter = () => {


//     setSelectedCity(null);

//     setCityInput("");

//     setSelectedCategory(
//       categoryOptions[0]
//     );


//     setSelectedPrice(
//       priceOptions[0]
//     );



//     setLocation(
//       "All Location"
//     );


//     setCategory(
//       "All Category"
//     );


//     setPrice("");



//     setPage(1);

//   };







//   return (

//     <div

//       className={`w-full overflow-visible bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${filterOpen
//         ?
//         "max-h-40 opacity-100 py-2"
//         :
//         "max-h-0 opacity-0 py-0 border-b-0"
//         }`}

//     >


//       <nav className="w-full px-6">


//         <div className="flex items-center justify-between flex-wrap gap-3">



//           <div className="flex items-center gap-2">


//             <SlidersHorizontal
//               size={20}
//               className="text-green-600"
//             />


//             <h2 className="text-lg font-semibold text-green-700">
//               Filters
//             </h2>


//           </div>





//           <div className="flex items-center gap-2 flex-wrap">



//             <div className="w-64">


//               <Select<Option, false>

//                 options={filteredCityOptions}

//                 value={selectedCity}


//                 onInputChange={(value, action) => {


//                   if (action.action === "input-change") {

//                     setCityInput(value);

//                   }

//                 }}



//                 onChange={(selected) => {


//                   setSelectedCity(selected);


//                   setCityInput(
//                     selected?.label || ""
//                   );


//                 }}



//                 placeholder="Location"

//                 isSearchable

//                 isDisabled={disableLocationPrice}

//                 styles={customSelectStyles}



//                 noOptionsMessage={() =>


//                   cityInput.trim().length < 2

//                     ?

//                     "Type at least 2 letters"

//                     :

//                     "No city found"


//                 }

//               />


//             </div>





//             <div className="w-44">


//               <Select<Option, false>

//                 options={categoryOptions}

//                 value={selectedCategory}


//                 onChange={(selected) =>

//                   setSelectedCategory(selected)

//                 }


//                 styles={customSelectStyles}

//                 isSearchable={false}

//               />


//             </div>







//             <div className="w-40">


//               <Select<Option, false>

//                 options={priceOptions}

//                 value={selectedPrice}


//                 onChange={(selected) =>

//                   setSelectedPrice(selected)

//                 }


//                 isDisabled={disableLocationPrice}

//                 styles={customSelectStyles}

//                 isSearchable={false}

//               />


//             </div>







//             <button

//               onClick={handleFilter}

//               className="h-11.5 px-5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition cursor-pointer"

//             >

//               Apply

//             </button>







//             <button

//               onClick={() => {

//                 resetFilter();

//                 setFilterOpen(false);

//               }}

//               className="h-11.5 w-11.5 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition cursor-pointer"

//             >

//               <X size={18} className="text-red-500" />

//             </button>






//           </div>


//         </div>


//       </nav>


//     </div>


//   );


// };


// export default Navbar;

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Select from "react-select";
import { City } from "country-state-city";
import { useLocation } from "react-router-dom";

import { useCustomerProducts } from "../../../hooks/useCustomerProducts";
import { useCustomerFarmerProducts } from "../../../hooks/useCustomerFarmerProducts";
import { useCustomerNavigation } from "../../../hooks/useCustomerNavigation";
import useCusomterOrders from "../../../hooks/useProductOrders";
import { useWishlist } from "../../../hooks/useWishlist";


type NavbarProps = {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Option = {
  value: string;
  label: string;
};


const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: "46px",
    borderRadius: "14px",
    borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
    backgroundColor: "#f9fafb",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(34,197,94,0.15)"
      : "none",
    cursor: "pointer",
    fontSize: "14px",
    "&:hover": {
      borderColor: "#86efac",
    },
  }),


  option: (base: any, state: any) => ({
    ...base,
    backgroundColor:
      state.isSelected
        ? "#16a34a"
        : state.isFocused
          ? "#d1d5db"
          : "white",

    color:
      state.isSelected
        ? "white"
        : "#111827",

    cursor: "pointer",
    padding: "10px 14px",

    ":active": {
      backgroundColor:
        state.isSelected
          ? "#16a34a"
          : "#d1d5db",
    },

  }),


  menu: (base: any) => ({
    ...base,
    borderRadius: "14px",
    overflow: "hidden",
    zIndex: 9999,
  }),


  indicatorSeparator: () => ({ display: "none", })
};

const categoryOptions: Option[] = [
  {
    value: "",
    label: "Category",
  },
  {
    value: "Vegetables",
    label: "Vegetables",
  },
  {
    value: "Fruits",
    label: "Fruits",
  },
  {
    value: "Grains",
    label: "Grains",
  },
];

const priceOptions: Option[] = [
  {
    value: "",
    label: "Price",
  },
  {
    value: "lowToHigh",
    label: "Low → High",
  },
  {
    value: "highToLow",
    label: "High → Low",
  },
];

const Navbar = ({ filterOpen, setFilterOpen }: NavbarProps) => {

  const routerLocation = useLocation();
  const { activePage } = useCustomerNavigation();
  const isFarmerPage = routerLocation.pathname.includes("/customer/farmer/");
  const customerProduct = useCustomerProducts();
  const farmerProduct = useCustomerFarmerProducts();
  const order = useCusomterOrders();
  const wishlist = useWishlist();

  const disableLocationPrice = activePage === "orders" || activePage === "wishlist" || isFarmerPage;

  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(categoryOptions[0]);
  const [selectedPrice, setSelectedPrice] = useState<Option | null>(priceOptions[0]);

  const allCityOptions: Option[] = useMemo(() => {

    const cities = City.getCitiesOfCountry("IN") || [];
    return cities.map(city => ({
      value:
        `${city.name}, ${city.stateCode}, India`,
      label:
        `${city.name}, ${city.stateCode}, India`,
    }));
  }, []);

//   const allCityOptions: Option[] = useMemo(() => {
//   const cities = City.getCitiesOfCountry("IN") || [];

//   return cities.map(city => ({
//     value: city.name,
//     label: `${city.name}, ${city.stateCode}, India`,
//   }));
// }, []);

  const filteredCityOptions = useMemo(() => {
    if (cityInput.trim().length < 2)
      return [];

    return allCityOptions
      .filter(city =>
        city.label
          .toLowerCase()
          .includes(
            cityInput.toLowerCase()
          )
      )
      .slice(0, 50);
  }, [cityInput, allCityOptions]);

  // const handleFilter = () => {
  //   if (isFarmerPage) {

  //     farmerProduct.setCategory(selectedCategory?.value || "");
  //     farmerProduct.setPage(1);
  //   }
  //   else {
  //     if (!disableLocationPrice) {

  //       customerProduct.setLocation(selectedCity?.value || "All Location");

  //       customerProduct.setPrice(selectedPrice?.value || "");
  //     }

  //     customerProduct.setCategory(selectedCategory?.value || "All Category");
  //     customerProduct.setPage(1);
  //   }
  // };

  const handleFilter = () => {

    if (isFarmerPage) {
      farmerProduct.setCategory(selectedCategory?.value || "");
      farmerProduct.setPage(1);
    }
    else if (activePage === "orders") {

      order.setCategory(selectedCategory?.value || "");
      order.setPage(1);
    }
    else if (activePage === "wishlist") {

      wishlist.setCategory(selectedCategory?.value || "");
      wishlist.setPage(1);
    }
    else {
      if (!disableLocationPrice) {
        customerProduct.setLocation(selectedCity?.value || "All Location");

        customerProduct.setPrice(selectedPrice?.value || "");
      }
      customerProduct.setCategory(selectedCategory?.value || "All Category");
      customerProduct.setPage(1);
    }
  };

  // const resetFilter = () => {

  //   setSelectedCity(null);
  //   setCityInput("");
  //   setSelectedCategory(categoryOptions[0]);
  //   setSelectedPrice(priceOptions[0]);

  //   if (isFarmerPage) {

  //     farmerProduct.setCategory("");
  //     farmerProduct.setPage(1);
  //   }
  //   else {

  //     customerProduct.setLocation("All Location");
  //     customerProduct.setCategory("All Category");
  //     customerProduct.setPrice("");
  //     customerProduct.setPage(1);
  //   }
  // };

  const resetFilter = () => {

    setSelectedCity(null);
    setCityInput("");
    setSelectedCategory(categoryOptions[0]);
    setSelectedPrice(priceOptions[0]);

    if (isFarmerPage) {
      farmerProduct.setCategory("");
      farmerProduct.setPage(1);
    }

    else if (activePage === "orders") {
      order.setCategory("");
      order.setPage(1);
    }
    else if (activePage === "wishlist") {

      wishlist.setCategory("");
      wishlist.setPage(1);
    }
    else {
      customerProduct.setLocation("All Location");
      customerProduct.setCategory("All Category");
      customerProduct.setPrice("");
      customerProduct.setPage(1);
    }
  };

  return (
    <div className={`w-full overflow-visible bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${filterOpen
      ?
      "max-h-40 opacity-100 py-2"
      :
      "max-h-0 opacity-0 py-0 border-b-0"
      }`}    >

      <nav className="w-full px-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-green-600" />
            <h2 className="text-lg font-semibold text-green-700">
              Filters
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            
         
            {activePage !== "orders" &&
              activePage !== "wishlist" &&
              !isFarmerPage && (
               <div className="w-64">
              <Select<Option, false>
                options={filteredCityOptions}
                value={selectedCity}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") {
                    setCityInput(value);
                  }
                }}
                onChange={(selected) => {
                  setSelectedCity(selected);
                  setCityInput(selected?.label || "");
                }}
                placeholder="Location"
                isSearchable
                isDisabled={disableLocationPrice}
                styles={customSelectStyles}
                noOptionsMessage={() =>
                  cityInput.trim().length < 2 ? "Type at least 2 letters" : "No city found"} />
            </div>
              )}

            <div className="w-44">
              <Select<Option, false>
                options={categoryOptions}
                value={selectedCategory}
                onChange={(selected) => setSelectedCategory(selected)}
                styles={customSelectStyles}
                isSearchable={false} />
            </div>

            {/* <div className="w-40">
              <Select<Option, false>
                options={priceOptions}
                value={selectedPrice}
                onChange={(selected) => setSelectedPrice(selected)}
                isDisabled={disableLocationPrice}
                styles={customSelectStyles}
                isSearchable={false} />
            </div> */}
            {activePage !== "orders" &&
              activePage !== "wishlist" &&
              !isFarmerPage && (
                <div className="w-40">
                  <Select<Option, false>
                    options={priceOptions}
                    value={selectedPrice}
                    onChange={(selected) => setSelectedPrice(selected)}
                    styles={customSelectStyles}
                    isSearchable={false}
                  />
                </div>
              )}

            <button
              onClick={handleFilter}
              className="h-11.5 px-5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition cursor-pointer">
              Apply
            </button>

            <button
              onClick={() => { resetFilter(); setFilterOpen(false); }}
              className="h-11.5 w-11.5 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition cursor-pointer">
              <X size={18} className="text-red-500" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;