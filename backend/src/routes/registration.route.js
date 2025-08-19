import express from "express";
import {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration
} from "../controllers/registration.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Register for an event (POST /api/registration)
router.post("/", verifyJWT, registerForEvent);

// ✅ Get current user's registered events (GET /api/registration/my-events)
router.get("/my-events", verifyJWT, getMyRegistrations);

// ✅ Cancel a registration (DELETE /api/registration/:eventId) — optional
router.delete("/:eventId", verifyJWT, cancelRegistration);

export default router;
