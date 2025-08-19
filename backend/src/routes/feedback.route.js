import express from "express";
import {
  submitFeedback,
  getEventFeedback
} from "../controllers/feedback.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Submit feedback for an event (POST /api/feedback/:eventId)
router.post("/:eventId", verifyJWT, submitFeedback);

// ✅ Get all feedback for an event (GET /api/feedback/:eventId)
router.get("/:eventId", getEventFeedback);

export default router;
