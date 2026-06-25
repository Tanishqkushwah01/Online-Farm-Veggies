import {z} from "zod";

const userValidation = z.object({
    username:z.string()
    .min(3)
    .max(15),
    
    email: z
    .email(),

    password: z
    .string()
    .min(6,"Password must be minimum of 6 characters")
    .regex ( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
  "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, and must not contain spaces."
),

phoneNumber:z
.string()
 .regex(/^[6-9][0-9]{9}$/, "Phone number must contain 10 digits"),

role: z.enum(["User", "Admin", "Farmer"]),
})


export default userValidation;