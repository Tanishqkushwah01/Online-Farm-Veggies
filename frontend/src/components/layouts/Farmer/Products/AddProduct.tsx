// import { X, Trash2 } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import {
//   productSchema,
//   type ProductFormData,
// } from "../../../Validation/farmerProduct.schema";
// import { createProduct, updateProduct } from "../../../Api/farmerApi";
// import ImageCropModal from "../../../Settings/ImageCropModal";
// import { useFarmerProducts } from "../../../hooks/useFarmerProducts";

// interface AddProductModalProps {
//   open: boolean;
//   onClose: () => void;
//   editProduct?: any | null;
// }

// type FormErrors = Partial<Record<keyof ProductFormData, string>>;

// const AddProduct = ({ open, onClose, editProduct }: AddProductModalProps) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const isEdit = Boolean(editProduct);

//   const [productName, setProductName] = useState("");
//   const [category, setCategory] = useState("Vegetables");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [unit, setUnit] = useState("Kg");
//   const [stockStatus, setStockStatus] = useState("In Stock");
//   const [description, setDescription] = useState("");

//   const [image, setImage] = useState<File | undefined>();
//   const [oldImage, setOldImage] = useState("");
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const [errors, setErrors] = useState<FormErrors>({});
//   const { fetchProducts } = useFarmerProducts();

//   useEffect(() => {
//     if (open && editProduct) {
//       setProductName(editProduct.productName || "");
//       setCategory(editProduct.category || "Vegetables");
//       setPrice(String(editProduct.price || ""));
//       setQuantity(String(editProduct.quantity || ""));
//       setUnit(editProduct.unit || "Kg");
//       setStockStatus(editProduct.stockStatus || "In Stock");
//       setDescription(editProduct.description || "");
//       setOldImage(editProduct.image || "");
//       setImage(undefined);
//       setSelectedImage(null);
//       setErrors({});
//       resetFileInput();
//     }

//     if (open && !editProduct) {
//       resetForm();
//     }
//   }, [open, editProduct]);

//   if (!open) return null;

//   const clearError = (field: keyof ProductFormData) => {
//     setErrors((prev) => ({ ...prev, [field]: undefined }));
//   };

//   function resetFileInput() {
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }

//   function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     clearError("image");
//     setSelectedImage(URL.createObjectURL(file));
//   }

//   function handleCropDone(file: File) {
//     setImage(file);
//     setOldImage("");
//     setSelectedImage(null);
//     resetFileInput();
//     clearError("image");
//   }

//   function handleRemoveImage() {
//     setImage(undefined);
//     setOldImage("");
//     setSelectedImage(null);
//     resetFileInput();
//     clearError("image");
//   }

//   function resetForm() {
//     setProductName("");
//     setCategory("Vegetables");
//     setPrice("");
//     setQuantity("");
//     setUnit("Kg");
//     setStockStatus("In Stock");
//     setDescription("");
//     setImage(undefined);
//     setOldImage("");
//     setSelectedImage(null);
//     setErrors({});
//     resetFileInput();
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const productData: any = {
//       productName: productName.trim(),
//       category,
//       price: price.trim(),
//       quantity: quantity.trim(),
//       unit,
//       stockStatus,
//       description: description.trim() || undefined,
//       image,
//     };

//     const result = productSchema.safeParse(productData);

//     if (!result.success) {
//       const fieldErrors = result.error.flatten().fieldErrors;

//       const newErrors: FormErrors = {
//         productName: fieldErrors.productName?.[0],
//         category: fieldErrors.category?.[0],
//         price: fieldErrors.price?.[0],
//         quantity: fieldErrors.quantity?.[0],
//         unit: fieldErrors.unit?.[0],
//         stockStatus: fieldErrors.stockStatus?.[0],
//         description: fieldErrors.description?.[0],
//         image: fieldErrors.image?.[0],
//       };

//       if (isEdit && oldImage && !image) {
//         delete newErrors.image;
//       }

//       setErrors(newErrors);

//       const hasError = Object.values(newErrors).some(Boolean);
//       if (hasError) return;
//     }

//     if (!image && !oldImage) {
//       setErrors((prev) => ({
//         ...prev,
//         image: "Product image is required",
//       }));
//       return;
//     }

//     setErrors({});

//     const payload: any = {
//       productName: productName.trim(),
//       category,
//       price: Number(price),
//       quantity: Number(quantity),
//       unit,
//       stockStatus,
//       description: description.trim() || "",
//     };

//     if (image) {
//       payload.image = image;
//     }

//     const response = isEdit
//       ? await updateProduct(editProduct._id, payload)
//       : await createProduct(payload);

//     if (response.data.success) {
//       await fetchProducts();
//       resetForm();
//       onClose();
//     }
//   }

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//         <div className="relative w-162.5 overflow-hidden rounded-2xl bg-white shadow-2xl">
//           <div className="flex items-center justify-between border-b px-6 py-5">
//             <h2 className="text-3xl font-bold text-slate-800">
//               {isEdit ? "Update Product" : "Add Product"}
//             </h2>

//             <button
//               type="button"
//               onClick={onClose}
//               className="cursor-pointer rounded-full p-2 transition hover:bg-gray-100"
//             >
//               <X size={28} />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
//               <div className="grid grid-cols-2 gap-5">
//                 <div>
//                   <label className="mb-2 block font-semibold">
//                     Product Name
//                   </label>
//                   <input
//                     type="text"
//                     value={productName}
//                     onChange={(e) => {
//                       setProductName(e.target.value);
//                       if (e.target.value.trim()) clearError("productName");
//                     }}
//                     placeholder="Tomato"
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   />
//                   {errors.productName && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.productName}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block font-semibold">Category</label>
//                   <select
//                     value={category}
//                     onChange={(e) => {
//                       setCategory(e.target.value);
//                       clearError("category");
//                     }}
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   >
//                     <option>Vegetables</option>
//                     <option>Fruits</option>
//                     <option>Grains</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-2 block font-semibold">Price (₹)</label>
//                   <input
//                     type="number"
//                     value={price}
//                     onChange={(e) => {
//                       setPrice(e.target.value);
//                       if (Number(e.target.value) > 0) clearError("price");
//                     }}
//                     placeholder="40"
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   />
//                   {errors.price && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.price}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block font-semibold">Quantity</label>
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => {
//                       setQuantity(e.target.value);
//                       if (Number(e.target.value) > 0) clearError("quantity");
//                     }}
//                     placeholder="100"
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   />
//                   {errors.quantity && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.quantity}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block font-semibold">Unit</label>
//                   <select
//                     value={unit}
//                     onChange={(e) => {
//                       setUnit(e.target.value);
//                       clearError("unit");
//                     }}
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   >
//                     <option>Kg</option>
//                     <option>Gram</option>
//                     <option>Piece</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-2 block font-semibold">
//                     Stock Status
//                   </label>
//                   <select
//                     value={stockStatus}
//                     onChange={(e) => {
//                       setStockStatus(e.target.value);
//                       clearError("stockStatus");
//                     }}
//                     className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                   >
//                     <option>In Stock</option>
//                     <option>Out of Stock</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <label className="mb-2 block font-semibold">Description</label>
//                 <textarea
//                   rows={3}
//                   value={description}
//                   onChange={(e) => {
//                     setDescription(e.target.value);
//                     clearError("description");
//                   }}
//                   placeholder="Write product description..."
//                   className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
//                 />
//               </div>

//               <div className="mt-5">
//                 <label className="mb-2 block font-semibold">
//                   Product Image
//                 </label>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhoto}
//                   className="hidden"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="w-full cursor-pointer rounded-xl border border-gray-300 p-3 text-left"
//                 >
//                   <span className="mr-4 inline-block cursor-pointer rounded-lg bg-green-600 px-4 py-2 font-medium text-white">
//                     Choose file
//                   </span>

//                   <span className="text-gray-700">
//                     {image
//                       ? image.name
//                       : oldImage
//                       ? "Old image selected"
//                       : "No file chosen"}
//                   </span>
//                 </button>

//                 {errors.image && (
//                   <p className="mt-1 text-sm text-red-500">{errors.image}</p>
//                 )}

//                 {(image || oldImage) && (
//                   <div className="mt-3 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
//                     <p className="text-sm font-medium text-green-700">
//                       {image ? "New image selected" : "Old image selected"}
//                     </p>

//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"
//                     >
//                       <Trash2 size={16} />
//                       Remove Image
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end gap-4 border-t px-6 py-5">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="cursor-pointer rounded-xl border border-gray-300 px-6 py-2.5 font-medium hover:bg-gray-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="cursor-pointer rounded-xl bg-green-600 px-7 py-2.5 font-medium text-white hover:bg-green-700"
//               >
//                 {isEdit ? "Update Product" : "Add Product"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {selectedImage && (
//         <ImageCropModal
//           image={selectedImage}
//           onClose={() => {
//             setSelectedImage(null);
//             resetFileInput();
//           }}
//           onCropDone={handleCropDone}
//           variant="product"
//         />
//       )}
//     </>
//   );
// };

// export default AddProduct;


import { X, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  productSchema,
  type ProductFormData,
} from "../../../Validation/farmerProduct.schema";
import { createProduct, updateProduct } from "../../../Api/farmerApi";
import ImageCropModal from "../../../Settings/ImageCropModal";
import { useFarmerProducts } from "../../../hooks/useFarmerProducts";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  editProduct?: any | null;
}

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const AddProduct = ({
  open,
  onClose,
  editProduct,
}: AddProductModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isEdit = Boolean(editProduct);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Kg");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | undefined>();
  const [oldImage, setOldImage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const { fetchProducts } = useFarmerProducts();

  useEffect(() => {
    if (open && editProduct) {
      setProductName(editProduct.productName || "");
      setCategory(editProduct.category || "Vegetables");
      setPrice(String(editProduct.price || ""));
      setQuantity(String(editProduct.quantity || ""));
      setUnit(editProduct.unit || "Kg");
      setStockStatus(editProduct.stockStatus || "In Stock");
      setDescription(editProduct.description || "");
      setOldImage(editProduct.image || "");
      setImage(undefined);
      setSelectedImage(null);
      setErrors({});
      resetFileInput();
    }

    if (open && !editProduct) {
      resetForm();
    }
  }, [open, editProduct]);

  if (!open) return null;

  const clearError = (field: keyof ProductFormData) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  function resetFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    clearError("image");
    setSelectedImage(URL.createObjectURL(file));
  }

  function handleCropDone(file: File) {
    setImage(file);
    setOldImage("");
    setSelectedImage(null);
    resetFileInput();
    clearError("image");
  }

  function handleRemoveImage() {
    setImage(undefined);
    setOldImage("");
    setSelectedImage(null);
    resetFileInput();
    clearError("image");
  }

  function resetForm() {
    setProductName("");
    setCategory("Vegetables");
    setPrice("");
    setQuantity("");
    setUnit("Kg");
    setStockStatus("In Stock");
    setDescription("");
    setImage(undefined);
    setOldImage("");
    setSelectedImage(null);
    setErrors({});
    resetFileInput();
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const productData: any = {
      productName: productName.trim(),
      category,
      price: price.trim(),
      quantity: quantity.trim(),
      unit,
      stockStatus,
      description: description.trim() || undefined,
      image,
    };

    const result = productSchema.safeParse(productData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      const newErrors: FormErrors = {
        productName: fieldErrors.productName?.[0],
        category: fieldErrors.category?.[0],
        price: fieldErrors.price?.[0],
        quantity: fieldErrors.quantity?.[0],
        unit: fieldErrors.unit?.[0],
        stockStatus: fieldErrors.stockStatus?.[0],
        description: fieldErrors.description?.[0],
        image: fieldErrors.image?.[0],
      };

      if (isEdit && oldImage && !image) {
        delete newErrors.image;
      }

      setErrors(newErrors);

      const hasError = Object.values(newErrors).some(Boolean);

      if (hasError) return;
    }

    if (!image && !oldImage) {
      setErrors((prev) => ({
        ...prev,
        image: "Product image is required",
      }));

      return;
    }

    setErrors({});

    const payload: any = {
      productName: productName.trim(),
      category,
      price: Number(price),
      quantity: Number(quantity),
      unit,
      stockStatus,
      description: description.trim() || "",
    };

    if (image) {
      payload.image = image;
    }

    const response = isEdit
      ? await updateProduct(editProduct._id, payload)
      : await createProduct(payload);

    if (response.data.success) {
      await fetchProducts();
      resetForm();
      onClose();
    }
  }

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-3 py-4 backdrop-blur-sm sm:px-4">
        {/* Modal */}
        <div
          className="
            relative
            flex
            w-full
            max-w-[650px]
            max-h-[calc(100vh-2rem)]
            flex-col
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            transition-colors
            duration-200
            dark:border-[#29343c]
            dark:bg-[#141c23]
            sm:max-h-[90vh]
          "
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-[#29343c]">
            <h2 className="min-w-0 text-2xl font-bold text-slate-800 sm:text-3xl dark:text-[#f5f7f8]">
              {isEdit ? "Update Product" : "Add Product"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 cursor-pointer rounded-full p-2 text-gray-500 transition hover:bg-gray-100 dark:text-[#9aa7b1] dark:hover:bg-[#192128]"
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* Scrollable Form Content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Product Name */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);

                      if (e.target.value.trim()) {
                        clearError("productName");
                      }
                    }}
                    placeholder="Tomato"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                      dark:placeholder:text-[#71808a]
                    "
                  />

                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.productName}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      clearError("category");
                    }}
                    className="
                      w-full
                      cursor-pointer
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                    "
                  >
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains</option>
                  </select>
                </div>

                {/* Price */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Price (₹)
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);

                      if (Number(e.target.value) > 0) {
                        clearError("price");
                      }
                    }}
                    placeholder="40"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                      dark:placeholder:text-[#71808a]
                    "
                  />

                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Quantity
                  </label>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);

                      if (Number(e.target.value) > 0) {
                        clearError("quantity");
                      }
                    }}
                    placeholder="100"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                      dark:placeholder:text-[#71808a]
                    "
                  />

                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                {/* Unit */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Unit
                  </label>

                  <select
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      clearError("unit");
                    }}
                    className="
                      w-full
                      cursor-pointer
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                    "
                  >
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Piece</option>
                  </select>
                </div>

                {/* Stock Status */}
                <div className="min-w-0">
                  <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                    Stock Status
                  </label>

                  <select
                    value={stockStatus}
                    onChange={(e) => {
                      setStockStatus(e.target.value);
                      clearError("stockStatus");
                    }}
                    className="
                      w-full
                      cursor-pointer
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-3
                      text-slate-900
                      outline-none
                      transition
                      focus:border-green-500
                      dark:border-[#29343c]
                      dark:bg-[#192128]
                      dark:text-[#f5f7f8]
                    "
                  >
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearError("description");
                  }}
                  placeholder="Write product description..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-green-500
                    dark:border-[#29343c]
                    dark:bg-[#192128]
                    dark:text-[#f5f7f8]
                    dark:placeholder:text-[#71808a]
                  "
                />

                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Product Image */}
              <div className="mt-5">
                <label className="mb-2 block font-semibold text-slate-900 dark:text-[#f5f7f8]">
                  Product Image
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    flex
                    w-full
                    cursor-pointer
                    flex-col
                    gap-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    p-3
                    text-left
                    transition
                    hover:border-green-400
                    sm:flex-row
                    sm:items-center
                    dark:border-[#29343c]
                    dark:bg-[#192128]
                    dark:hover:border-[#00c767]
                  "
                >
                  <span className="inline-block w-fit shrink-0 rounded-lg bg-green-600 px-4 py-2 font-medium text-white">
                    Choose file
                  </span>

                  <span className="min-w-0 break-all text-gray-700 dark:text-[#c4cdd3]">
                    {image
                      ? image.name
                      : oldImage
                        ? "Old image selected"
                        : "No file chosen"}
                  </span>
                </button>

                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.image}
                  </p>
                )}

                {(image || oldImage) && (
                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-[#24533d] dark:bg-[#123126]">
                    <p className="text-sm font-medium text-green-700 dark:text-[#00c767]">
                      {image
                        ? "New image selected"
                        : "Old image selected"}
                    </p>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex w-fit cursor-pointer items-center gap-1 text-sm font-semibold text-red-600 transition hover:text-red-700 dark:text-[#ff6578] dark:hover:text-[#ff8291]"
                    >
                      <Trash2 size={16} />
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 px-4 py-4 sm:px-6 sm:py-5 dark:border-[#29343c]">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    w-full
                    cursor-pointer
                    rounded-xl
                    border
                    border-gray-300
                    px-6
                    py-2.5
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-100
                    dark:border-[#29343c]
                    dark:text-[#f5f7f8]
                    dark:hover:bg-[#192128]
                    sm:w-auto
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    w-full
                    cursor-pointer
                    rounded-xl
                    bg-green-600
                    px-7
                    py-2.5
                    font-medium
                    text-white
                    transition
                    hover:bg-green-700
                    sm:w-auto
                  "
                >
                  {isEdit ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Crop Modal */}
      {selectedImage && (
        <ImageCropModal
          image={selectedImage}
          onClose={() => {
            setSelectedImage(null);
            resetFileInput();
          }}
          onCropDone={handleCropDone}
          variant="product"
        />
      )}
    </>
  );
};

export default AddProduct;
