import express from "express";
import passport from "passport";
import "../config/passport.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth,
} from "../controllers/user.controller.js";

import {
  initiateAuth,
  oauth2Callback,
} from "../controllers/googleCalender.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);

// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     session: false,
//   })
// );
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  googleAuth
);

router.get("/auth", initiateAuth);
router.get("/oauth2callback", oauth2Callback);

export default router;
