import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share2,
  ArrowLeft,
} from "lucide-react";
// import googleCalendarService from "../backendConnect/googleCalender";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SimpleEventDetail = ({ event }) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventStatus = params.get("event");

    if (eventStatus === "created") {
      alert("✅ Event created successfully!");
      // or use a toast here
    } else if (eventStatus === "error") {
      alert("❌ Failed to create event.");
    }
  }, [location]);

  const handleClick = () => {
    const startDateTime = new Date(`${event.date}T${convertTo24H(event.time)}`);
    const endDateTime = new Date(
      `${event.date}T${convertTo24H(event.endTime)}`
    );

    const eventDetails = new URLSearchParams({
      summary: event.title,
      description: event.description,
      location: event.location,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
    });

    window.open(
      `http://localhost:8000/api/v1/users/auth?${eventDetails.toString()}`,
      "_blank"
    );
  };

  // Utility: convert 12h time like "09:00 AM" → "09:00" 24h
  function convertTo24H(time12h) {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  }

  const addToGoogleCalendar = () => {
    const startDate = new Date(`${event.date} ${event.time}`);
    const endDate = new Date(`${event.date} ${event.endTime}`);

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(
      endDate
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const attendancePercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-full mx-auto text-blue-600 p-4 flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </button>
          <div className="flex-1" />
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4" />
            Save
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8">
          <div className="h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt={event.title}
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 text-white border border-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {event.category}
                </span>
                <span className="bg-green-500/80 text-white px-3 py-1 rounded-full text-sm">
                  {event.maxAttendees - event.attendees} spots left
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {event.title}
              </h1>
              <p className="text-xl opacity-90 mb-4">
                Organized by {event.organizer}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {event.time} - {event.endTime}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6 flex-col items-center justify-center">
              <div className="flex  flex-wrap gap-4 justify-center">
                <button
                  onClick={handleClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 flex-1 min-w-48 justify-center transition-colors"
                >
                  <Calendar className="h-8 w-8" />
                  Add to Google Calendar <br />(Google Auth)
                </button>

                <button
                  onClick={addToGoogleCalendar}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 flex-1 min-w-48 justify-center transition-colors"
                >
                  <Calendar className="h-8 w-8" />   
                  Add to Google Calendar <br />( Direct Link)
                </button>
              </div>
            </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 flex-1   transition-colors">
                  Register Now
                </button>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    What You'll Learn
                  </h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Latest technology trends</li>
                    <li>• Industry best practices</li>
                    <li>• Networking opportunities</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">
                    Event Highlights
                  </h3>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Expert speakers</li>
                    <li>• Interactive sessions</li>
                    <li>• Career guidance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Event Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details */}
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Event Details</h3>

              {/* Date & Time */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">{formatDate(event.date)}</p>
                  <p className="text-gray-600">
                    {event.time} - {event.endTime}
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              {/* Location */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              <hr className="my-4" />

              {/* Attendees */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Attendees</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {event.attendees} / {event.maxAttendees} registered
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {Math.round(attendancePercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${attendancePercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Price */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <span className="font-semibold">Price</span>
                <span className="text-2xl font-bold text-green-600">
                  {event.price === 0 ? "FREE" : `₹${event.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleEventDetail;
