import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine((value) => {
      const isEmail = z.email().safeParse(value).success;
      const isPhone = /^[6-9]\d{9}$/.test(value);

      return isEmail || isPhone;
    }, "Enter a valid email or phone number"),

  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;