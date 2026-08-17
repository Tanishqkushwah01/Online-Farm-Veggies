import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required"),

  category: z.enum(["Vegetables", "Fruits", "Grains"], {
    message: "Category is required",
  }),

  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => Number(value) > 0, "Price must be greater than 0"),

  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .refine((value) => Number(value) > 0, "Quantity must be greater than 0"),

  unit: z.enum(["Kg", "Gram", "Piece"], {
    message: "Unit is required",
  }),

  stockStatus: z.enum(["In Stock", "Out of Stock"], {
    message: "Stock status is required",
  }),

  description: z.string().trim().optional(),

  image: z.instanceof(File, {
    message: "Product image is required",
  }),
});

export type ProductFormData = z.infer<typeof productSchema>;

