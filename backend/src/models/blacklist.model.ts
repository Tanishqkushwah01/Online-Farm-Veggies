import mongoose, { model } from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blacklistModel = mongoose.model("BlacklistToken",blacklistTokenSchema)
export default blacklistModel;