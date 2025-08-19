// import axios from "axios";

// export class GoogleCalendarService {
//   url = `${import.meta.env.VITE_BACKEND_URI}/google-calendar`;

//   /**
//    * Start OAuth flow
//    * Redirects user to Google consent screen via backend
//    */
//   async startAuth() {
//     window.location.href = `${this.url}/auth`;
//   }

//   /**
//    * Get tokens after callback
//    * NOTE: Only needed if you handle the callback on frontend. 
//    * (If backend handles it and stores tokens, you can skip this.)
//    */
//   async handleCallback(queryString) {
//     try {
//       const { data } = await axios.get(`${this.url}/callback${queryString}`);
//       return data; // contains tokens
//     } catch (err) {
//       throw new Error(err.response?.data?.message || err.message);
//     }
//   }

//   /**
//    * Create an event in Google Calendar
//    * @param {Object} payload - event + tokens
//    */
//   async createEvent({ tokens, event }) {
//     try {
//       const { data } = await axios.post(`${this.url}/create-event`, {
//         tokens,
//         event,
//       });
//       return data;
//     } catch (err) {
//       throw new Error(err.response?.data?.message || err.message);
//     }
//   }
// }

// const googleCalendarService = new GoogleCalendarService();
// export default googleCalendarService;
