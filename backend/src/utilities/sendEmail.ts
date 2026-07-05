import customerModel from "../models/customer.model";
import farmerModel from "../models/farmer.model";
import { sendVerificationEmail } from "../utilities/sendEmailVerification";

export const sendVerificationMailToUser = async (email: string , role: string) => {

  let user : any;

  if (role === "customer") {
    user = await customerModel.findOne({ email });
  }

  if (role === "farmer") {
    user = await farmerModel.findOne({ email });
  }

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