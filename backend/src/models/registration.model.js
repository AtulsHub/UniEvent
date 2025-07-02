import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    registeredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Registration = mongoose.model("Registration", registrationSchema);
