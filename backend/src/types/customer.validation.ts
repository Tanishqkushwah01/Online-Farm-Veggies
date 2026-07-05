import { z } from "zod";

const customerValidation = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "Password must be at least 10 characters long and contain an uppercase letter, lowercase letter, number, and special character."
    ),

  phoneNumber: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian phone number"
    ),

  role: z.enum(["Customer", "Farmer", "Admin"]),

  city: z
    .string()
    .min(2, "City is required"),

  address: z
    .string()
    .min(5, "Address is required"),

  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),

  profilePicture: z
    .string()
    .optional(),
});

export default customerValidation;