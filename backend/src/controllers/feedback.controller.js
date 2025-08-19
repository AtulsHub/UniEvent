import { Feedback } from "../models/feedback.model.js";
import { Event } from "../models/event.model.js";

// ✅ Submit Feedback for an Event
export const submitFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const { eventId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const event = await Event.findById(eventId);
    if (!event || event.status !== "approved") {
      return res.status(404).json({ message: "Event not found or not eligible for feedback" });
    }

    const alreadySubmitted = await Feedback.findOne({ user: userId, event: eventId });
    if (alreadySubmitted) {
      return res.status(409).json({ message: "You have already submitted feedback for this event" });
    }

    const feedback = await Feedback.create({
      user: userId,
      event: eventId,
      rating,
      comment
    });

    // Optionally increment feedback count in Event
    await Event.findByIdAndUpdate(eventId, { $inc: { feedbackCount: 1 } });

    return res.status(201).json({
      message: "Feedback submitted",
      feedback
    });

  } catch (error) {
    console.error("Submit Feedback Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// ✅ Get Feedback for an Event (public or admin)
export const getEventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params;

    const feedbacks = await Feedback.find({ event: eventId })
      .populate("user", "name");

    return res.status(200).json(feedbacks);

  } catch (error) {
    console.error("Get Feedback Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
