// import {
//   CalendarDays,
//   MapPin,
//   Minus,
//   Package,
//   Plus,
//   ShoppingBag,
//   X,
// } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { createOrder } from "../../../Api/customerApi";
// import useOrder from "../../../hooks/useProductOrders";

// type OrderCardProps = {
//   productId: string;
//   price: number;
//   availableQuantity: number;
//   unit?: string;
//   city: string;
//   onClose: () => void;
// };

// const OrderCard = ({
//   productId,
//   price,
//   availableQuantity,
//   unit = "kg",
//   city,
//   onClose,
// }: OrderCardProps) => {
//   const { addOrderLocally } = useOrder();

//   const [quantity, setQuantity] = useState<number | "">(1);
//   const [requiredDate, setRequiredDate] = useState("");
//   const [loading, setLoading] = useState(false);

//   const finalQuantity = quantity === "" ? 0 : quantity;
//   const totalPrice = finalQuantity * price;

//   const handleQuantityChange = (value: number | "") => {
//     if (value === "") {
//       setQuantity("");
//       return;
//     }

//     if (value < 1) return;

//     if (value > availableQuantity) {
//       toast.error(`Only ${availableQuantity} ${unit} available`);
//       setQuantity(availableQuantity);
//       return;
//     }

//     setQuantity(value);
//   };

//   const handleOrder = async () => {
//     if (loading) return;

//     if (!finalQuantity || finalQuantity < 1) {
//       toast.error("Please enter quantity");
//       return;
//     }

//     if (!requiredDate) {
//       toast.error("Please select required date");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await createOrder({
//         productId,
//         quantity: finalQuantity,
//         requiredDate,
//         city,
//         totalPrice,
//       });
//       console.log("hreshfds====",response.data.order);

//       if (response.data.success) {
//         addOrderLocally(response.data.order);

//         toast.success(
//           "Order request sent. Please wait for farmer approval."
//         );

//         onClose();
//       }
//     } catch (error: any) {
//       console.log(error);

//       toast.error(
//         error?.response?.data?.message || "Failed to place order"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl"
//       >
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
//         >
//           <X size={19} />
//         </button>

//         <h2 className="pr-10 text-2xl font-bold text-gray-900">
//           Order Product
//         </h2>

//         <div className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           Maximum Quantity: {availableQuantity} {unit}
//         </div>

//         <div className="mt-5 space-y-4">
//           <div>
//             <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
//               <Package size={17} />
//               Quantity
//             </label>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => handleQuantityChange(finalQuantity - 1)}
//                 disabled={loading}
//                 className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <Minus size={18} />
//               </button>

//               <input
//                 type="number"
//                 value={quantity}
//                 min={1}
//                 max={availableQuantity}
//                 disabled={loading}
//                 onFocus={(e) => e.target.select()}
//                 onChange={(e) =>
//                   handleQuantityChange(
//                     e.target.value === "" ? "" : Number(e.target.value)
//                   )
//                 }
//                 className="h-11 w-24 rounded-xl border border-gray-300 text-center font-semibold outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
//               />

//               <button
//                 onClick={() => handleQuantityChange(finalQuantity + 1)}
//                 disabled={loading}
//                 className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <Plus size={18} />
//               </button>

//               <span className="text-sm font-medium text-gray-600">{unit}</span>
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
//               <CalendarDays size={17} />
//               Needed By
//             </label>

//             <input
//               type="date"
//               value={requiredDate}
//               min={new Date().toISOString().split("T")[0]}
//               disabled={loading}
//               onChange={(e) => setRequiredDate(e.target.value)}
//               className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
//               <MapPin size={17} />
//               City
//             </label>

//             <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-medium text-gray-700">
//               {city}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 rounded-2xl bg-gray-50 p-4">
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Price / {unit}</span>
//             <span>₹{price}</span>
//           </div>

//           <div className="mt-2 flex justify-between text-sm text-gray-600">
//             <span>Quantity</span>
//             <span>
//               {finalQuantity} {unit}
//             </span>
//           </div>

//           <div className="mt-4 border-t border-gray-200 pt-4">
//             <div className="flex justify-between text-lg font-bold text-gray-900">
//               <span>Total Price</span>
//               <span>₹{totalPrice}</span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={handleOrder}
//           disabled={loading}
//           className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
//         >
//           <ShoppingBag size={20} />
//           {loading ? "Placing Order..." : "Order Now"}
//         </button>

//         <p className="mt-3 text-center text-xs leading-5 text-gray-500">
//           After placing your order, please wait for some time. The farmer will
//           accept your order. If not accepted, you can directly call them.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OrderCard;

import {
  CalendarDays,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { createOrder } from "../../../Api/customerApi";
import useOrder from "../../../hooks/useProductOrders";

type OrderCardProps = {
  productId: string;
  price: number;
  availableQuantity: number;
  unit?: string;
  city: string;
  onClose: () => void;
};

const OrderCard = ({
  productId,
  price,
  availableQuantity,
  unit = "kg",
  city,
  onClose,
}: OrderCardProps) => {
  const { addOrderLocally } = useOrder();

  const [quantity, setQuantity] = useState<number | "">(1);
  const [requiredDate, setRequiredDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState(city || "");
  const [loading, setLoading] = useState(false);

  const finalQuantity = quantity === "" ? 0 : quantity;
  const totalPrice = finalQuantity * price;

  const handleQuantityChange = (value: number | "") => {
    if (value === "") {
      setQuantity("");
      return;
    }

    if (value < 1) return;

    if (value > availableQuantity) {
      toast.error(`Only ${availableQuantity} ${unit} available`);
      setQuantity(availableQuantity);
      return;
    }

    setQuantity(value);
  };

  const handleOrder = async () => {
    if (loading) return;

    if (!finalQuantity || finalQuantity < 1) {
      toast.error("Please enter quantity");
      return;
    }

    if (!requiredDate) {
      toast.error("Please select required date");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    try {
      setLoading(true);

      const response = await createOrder({
        productId,
        quantity: finalQuantity,
        requiredDate,
        city: deliveryAddress.trim(),
        totalPrice,
      });

      console.log("order====", response.data.order);

      if (response.data.success) {
        addOrderLocally(response.data.order);

        toast.success("Order request sent. Please wait for farmer approval.");

        onClose();
      }
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <X size={19} />
        </button>

        <h2 className="pr-10 text-2xl font-bold text-gray-900">
          Order Product
        </h2>

        <div className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Maximum Quantity: {availableQuantity} {unit}
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Package size={17} />
              Quantity
            </label>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(finalQuantity - 1)}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Minus size={18} />
              </button>

              <input
                type="number"
                value={quantity}
                min={1}
                max={availableQuantity}
                disabled={loading}
                onFocus={(e) => e.target.select()}
                onChange={(e) =>
                  handleQuantityChange(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="h-11 w-24 rounded-xl border border-gray-300 text-center font-semibold outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
              />

              <button
                onClick={() => handleQuantityChange(finalQuantity + 1)}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Plus size={18} />
              </button>

              <span className="text-sm font-medium text-gray-600">{unit}</span>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CalendarDays size={17} />
              Needed By
            </label>

            <input
              type="date"
              value={requiredDate}
              min={new Date().toISOString().split("T")[0]}
              disabled={loading}
              onChange={(e) => setRequiredDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin size={17} />
              Delivery Address
            </label>

            <input
              type="text"
              value={deliveryAddress}
              disabled={loading}
              maxLength={50}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter delivery address where farmer will deliver"
              className="h-11 w-full rounded-xl border border-gray-300 px-4 font-medium text-gray-700 outline-none focus:border-green-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price / {unit}</span>
            <span>₹{price}</span>
          </div>

          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>Quantity</span>
            <span>
              {finalQuantity} {unit}
            </span>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 font-bold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <ShoppingBag size={20} />
          {loading ? "Placing Order..." : "Order Now"}
        </button>

        <p className="mt-3 text-center text-xs leading-5 text-gray-500">
          After placing your order, please wait for some time. The farmer will
          accept your order. If not accepted, you can directly call them.
        </p>
      </div>
    </div>
  );
};

export default OrderCard;