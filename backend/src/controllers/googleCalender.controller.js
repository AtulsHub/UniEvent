import { oauth2Client, calendar } from "../services/googleOAuth.js";
import { google } from "googleapis";

export const initiateAuth = (req, res) => {
  const { summary, description, startTime, endTime } = req.query;

  const scopes = ["https://www.googleapis.com/auth/calendar.events"];

  const state = JSON.stringify({ summary, description, startTime, endTime });

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
    state,
  });

  res.redirect(url);
};

export const oauth2Callback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send("Missing authorization code.");
    }

    const eventDetails = JSON.parse(state);

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ auth: oauth2Client, version: "v3" });

    const event = {
      summary: eventDetails.summary,
      description: eventDetails.description,
      location: eventDetails.location,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: "Asia/Kolkata",
      },
    };


    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    console.log("✅ Event created:", response.data);

    // ✅ Redirect to frontend home page with query param
    res.redirect(`http://localhost:5173/?event=created`);
  } catch (err) {
    console.error(
      "Failed to handle OAuth2 callback:",
      err.response?.data || err.message || err
    );
    res.redirect(`http://localhost:5173/?event=error`);
  }
};
