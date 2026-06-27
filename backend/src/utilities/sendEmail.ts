import UserModel from "../models/user.model";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";

export const sendVerificationMailToUser = async (email: string) => {
  const user = await UserModel.findOne({ email });
console.log("USER---->",user)
  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email is already verified");
  }

  if (!user.verificationToken) {
    throw new Error("Verification token not found");
  }

  await sendVerificationEmail(
    user.email,
    user.verificationToken
  );

  return true;
};