import { z } from "zod";

 
export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(1, "Price is required"),
  quantity: z.coerce.number().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
  stockStatus: z.enum(["In Stock", "Out of Stock"]),
  description: z.string().min(1, "Description is required").optional(),
  image: z.instanceof(File).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

