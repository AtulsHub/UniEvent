import mongoose from "mongoose";
import { Schema } from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    district: { type: String, required: true },
    venue: { type: String, required: true },
    pincode: {
      type: String,
      required: true,
      match: /^[1-9][0-9]{5}$/,
    },
  },
  { _id: false }
);

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    highlights: [{ type: String }],
    audience: { type: String },
  },
  category: {
    type: String,
    required: true,
  },
  agenda: [
    {
      time: { type: String },
      activity: { type: String },
    },
  ],
  featuredSpeakers: [
    {
      name: { type: String },
      title: { type: String },
      profileImage: { type: String }, // URL or filename
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  thumbnailImage: {
    url: { type: String },
    title: { type: String },
  },
  gallery: [
    {
      url: { type: String },
      title: { type: String },
    },
  ],
  registrationLink: {
    type: String,
  },
  shareLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "ended"],
    default: "pending"
  },
}, { timestamps: true });


export const Event = mongoose.model("Event", eventSchema);
