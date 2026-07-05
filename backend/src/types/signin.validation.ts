import { z } from "zod";

const signinValidation = z
  .object({
    email: z.preprocess(
      (value) => value === "" ? undefined : value,
      z.string()
        .trim()
        .email("Please enter a valid email")
        .optional()
    ),

    phoneNumber: z.preprocess(
      (value) => value === "" ? undefined : value,
      z.string()
        .trim()
        .regex(
          /^[6-9]\d{9}$/,
          "Please enter a valid 10-digit Indian phone number"
        )
        .optional()
    ),

    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters"),
  })
  .refine((data) => data.email || data.phoneNumber, {
    message: "Email or phone number is required",
    path: ["email"],
  })
  .refine((data) => !(data.email && data.phoneNumber), {
    message: "Enter either email or phone number, not both",
    path: ["email"],
  });

export default signinValidation;