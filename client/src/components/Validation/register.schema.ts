import { z } from "zod";

export const registerSchema = z
  .object({
    role: z.enum(["Customer", "Farmer"]),

    fullName: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10 digit phone number"),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Confirm password is required"),

    terms: z.literal(true, {
      message: "You must accept terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;