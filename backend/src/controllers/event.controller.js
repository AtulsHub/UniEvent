import { Event } from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// 🆕 Create Event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      details,
      category,
      location,
      date,
      startTime,
      description,
      endTime,
      agenda,
      featuredSpeakers,
      price,
      capacity,
      tags,
      registrationLink,
      shareLink,
      status = "pending",
    } = req.body;

    const userId = req.user._id;

    if (
      !title ||
      !category ||
      !location ||
      !startTime ||
      !endTime ||
      !date ||
      !price
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }
    const thumbnailFile = req.files?.thumbnail?.[0];
    const galleryFiles = req.files?.gallery || [];
    if (!thumbnailFile) {
      return res.status(400).json({ message: "Thumbnail image is required" });
    }

    const thumbnailUpload = await uploadOnCloudinary(thumbnailFile.path);
    const thumbnailImage = {
      url: thumbnailUpload.secure_url,
      title: thumbnailFile.originalname,
    };

    const gallery = [];
    for (const file of galleryFiles) {
      const result = await uploadOnCloudinary(file.path);
      gallery.push({ url: result.secure_url, title: file.originalname });
    }

    const newEvent = await Event.create({
      title,
      description,
      details,
      category,
      location,
      date,
      startTime,
      endTime,
      agenda,
      featuredSpeakers,
      price,
      capacity,
      tags,
      registrationLink,
      shareLink,
      thumbnailImage,
      gallery,
      status,
      createdBy: userId,
    });

    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📖 Get All Events (with filters)
export const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, status } = req.query;
    const query = {};
    const totalCount = await Event.countDocuments(query);

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };
    if (status) query.status = status;

    const events = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      events,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔍 Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ event });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✏️ Update Event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🗑 Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👤 Get My Events
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    console.log(req.user._id);

    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📅 Get Upcoming Approved Events
export const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Event.find({
      date: { $gte: now },
      status: "approved",
    }).sort({ date: 1 });
    res.status(201).json({ message: "Viewing upcoming events", events });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🏷 Get Events By Category
export const getEventsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const events = await Event.find({ category }).sort({ createdAt: -1 });
    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🌟 Feature Event
export const featureEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { featured: true },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event marked as featured", event });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🗄 Archive Event
export const archiveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { archived: true, status: "ended" },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event archived", event });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🪄 Change Status (Pending ↔ Approved ↔ Ended)
export const changeEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "ended"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ message: `Event status changed to ${status}`, event });
  } catch (err) {
    console.error("Status Change Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
