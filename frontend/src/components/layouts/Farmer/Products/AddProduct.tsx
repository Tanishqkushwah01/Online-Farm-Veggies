import { X, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  productSchema,
  type ProductFormData,
} from "../../../Validation/farmerProduct.schema";
import { createProduct, updateProduct } from "../../../Api/farmerApi";
import ImageCropModal from "../../../Settings/ImageCropModal";
import { useProducts } from "../../../hooks/useFarmerProducts";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  editProduct?: any | null;
}

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const AddProduct = ({ open, onClose, editProduct }: AddProductModalProps) => {
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
  const { fetchProducts } = useProducts();

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
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function resetFileInput() {
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="relative w-162.5 overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="text-3xl font-bold text-slate-800">
              {isEdit ? "Update Product" : "Add Product"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full p-2 transition hover:bg-gray-100"
            >
              <X size={28} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block font-semibold">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      if (e.target.value.trim()) clearError("productName");
                    }}
                    placeholder="Tomato"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  />
                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.productName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      clearError("category");
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  >
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (Number(e.target.value) > 0) clearError("price");
                    }}
                    placeholder="40"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      if (Number(e.target.value) > 0) clearError("quantity");
                    }}
                    placeholder="100"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-semibold">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      clearError("unit");
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  >
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Piece</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Stock Status
                  </label>
                  <select
                    value={stockStatus}
                    onChange={(e) => {
                      setStockStatus(e.target.value);
                      clearError("stockStatus");
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                  >
                    <option>In Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearError("description");
                  }}
                  placeholder="Write product description..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              <div className="mt-5">
                <label className="mb-2 block font-semibold">
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
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 p-3 text-left"
                >
                  <span className="mr-4 inline-block cursor-pointer rounded-lg bg-green-600 px-4 py-2 font-medium text-white">
                    Choose file
                  </span>

                  <span className="text-gray-700">
                    {image
                      ? image.name
                      : oldImage
                      ? "Old image selected"
                      : "No file chosen"}
                  </span>
                </button>

                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}

                {(image || oldImage) && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <p className="text-sm font-medium text-green-700">
                      {image ? "New image selected" : "Old image selected"}
                    </p>

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 border-t px-6 py-5">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-gray-300 px-6 py-2.5 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-green-600 px-7 py-2.5 font-medium text-white hover:bg-green-700"
              >
                {isEdit ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

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