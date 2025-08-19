import { Registration } from "../models/registration.model.js";
import { Event } from "../models/event.model.js";

// ✅ Register a user for an event
export const registerForEvent = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "approved") {
      return res.status(403).json({ message: "This event is not open for registration" });
    }

    const alreadyRegistered = await Registration.findOne({ user: userId, event: eventId });
    if (alreadyRegistered) {
      return res.status(409).json({ message: "You have already registered for this event" });
    }

    const registration = await Registration.create({
      user: userId,
      event: eventId
    });

    return res.status(201).json({
      message: "Registered successfully",
      registration
    });

  } catch (error) {
    console.error("Register Event Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Get events registered by the current user
export const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;

    const registrations = await Registration.find({ user: userId })
      .populate({
        path: "event",
        select: "title date location status",
        populate: {
          path: "createdBy",
          select: "name"
        }
      });

    return res.status(200).json(registrations);

  } catch (error) {
    console.error("Get Registrations Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// 🚫 (Optional) Cancel registration
export const cancelRegistration = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;

    const registration = await Registration.findOneAndDelete({
      user: userId,
      event: eventId
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json({ message: "Registration cancelled" });

  } catch (error) {
    console.error("Cancel Registration Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

