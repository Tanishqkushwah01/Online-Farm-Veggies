import { X } from "lucide-react";
import { useState } from "react";
import { productSchema, type ProductFormData } from "../../Validation/farmerProduct.schema";
import { createProduct } from "../../Api/farmerApi";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

type FormErrors = Partial<Record<keyof ProductFormData, string>>;

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("Vegetables");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("Kg");
    const [stockStatus, setStockStatus] = useState("In Stock");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | undefined>();

    const [errors, setErrors] = useState<FormErrors>({});

    if (!open) return null;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = productSchema.safeParse({
            productName,
            category,
            price,
            quantity,
            unit,
            stockStatus,
            description,
            image,
        });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setErrors({
                productName: fieldErrors.productName?.[0],
                category: fieldErrors.category?.[0],
                price: fieldErrors.price?.[0],
                quantity: fieldErrors.quantity?.[0],
                unit: fieldErrors.unit?.[0],
                stockStatus: fieldErrors.stockStatus?.[0],
                description: fieldErrors.description?.[0],
                image: fieldErrors.image?.[0],
            });

            return;
        }

        setErrors({});

        // console.log("Validated data:", result.data);
        await createProduct(result.data);

        setProductName("");
        setCategory("Vegetables");
        setPrice("");
        setQuantity("");
        setUnit("Kg");
        setStockStatus("In Stock");
        setDescription("");
        setImage(undefined);

        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="relative w-162.5 overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-6 py-5">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Add Product
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
                                    onChange={(e) => setProductName(e.target.value)}
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
                                <label className="mb-2 block font-semibold">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                                >
                                    <option>Vegetables</option>
                                    <option>Fruits</option>
                                    <option>Grains</option>
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Price (₹)
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                                <label className="mb-2 block font-semibold">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
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
                                <label className="mb-2 block font-semibold">
                                    Unit
                                </label>
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                                >
                                    <option>Kg</option>
                                    <option>Gram</option>
                                    <option>Piece</option>
                                </select>
                                {errors.unit && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.unit}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block font-semibold">
                                    Stock Status
                                </label>
                                <select
                                    value={stockStatus}
                                    onChange={(e) => setStockStatus(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                                >
                                    <option>In Stock</option>
                                    <option>Out of Stock</option>
                                </select>
                                {errors.stockStatus && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.stockStatus}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block font-semibold">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write product description..."
                                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block font-semibold">
                                Product Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0])}
                                className="w-full rounded-xl border border-gray-300 file:cursor-pointer p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white"
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
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
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;