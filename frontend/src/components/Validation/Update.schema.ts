import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),

  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  city: z.string().trim().min(1, "City is required"),

  farmName: z
    .string()
    .trim()
    .min(1, "Farm name is required")
    .min(3, "Farm name must be at least 3 characters"),

  crops: z.string().trim().min(1, "Crop types are required"),

  farmAddress: z
    .string()
    .trim()
    .min(1, "Farm address is required")
    .min(5, "Farm address must be at least 5 characters"),

  bio: z.string().trim().optional().or(z.literal("")),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;