import {z} from "zod";

const resetPassValidation = z.object({

    password: z
    .string()
    .min(6,"Password must be minimum of 6 characters")
    .regex ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
  "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, and must not contain spaces."
),
})


export default resetPassValidation;