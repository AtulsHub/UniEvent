import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
  getUpcomingEvents,
  getEventsByCategory,
  updateEvent,
  deleteEvent,
  featureEvent,
  archiveEvent,
  changeEventStatus,
} from "../controllers/event.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// 🔷 Public routes
router.get("/upcoming", getUpcomingEvents); // approved + upcoming
router.get("/category/:category", getEventsByCategory);
router.get("/all", getAllEvents); // admin/faculty view of all events (with filters)
router.get("/:id", getEventById);

// 🔷 Organizer-only
router.post(
  "/create",
  verifyJWT,
  authorizeRoles("organizer", "admin"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createEvent
);

router.get("/mine", verifyJWT, authorizeRoles("organizer", "admin"), getMyEvents);

router.patch("/:id", verifyJWT, authorizeRoles("organizer", "admin"), updateEvent);

router.delete("/:id", verifyJWT, authorizeRoles("organizer", "admin"), deleteEvent);

// 🔷 Admin / Faculty moderation
// router.patch(
//   "/:id/moderate",
//   verifyJWT,
//   authorizeRoles("faculty", "admin"),
//   moderateEvent // existing controller
// );

router.patch(
  "/:id/status",
  verifyJWT,
  authorizeRoles("faculty", "admin"),
  changeEventStatus
);

router.patch(
  "/:id/feature",
  verifyJWT,
  authorizeRoles("faculty", "admin"),
  featureEvent
);

router.patch(
  "/:id/archive",
  verifyJWT,
  authorizeRoles("faculty", "admin"),
  archiveEvent
);

export default router;
