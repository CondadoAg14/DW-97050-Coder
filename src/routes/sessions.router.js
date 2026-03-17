import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  current,
  forgotPassword,
  resetPassword
} from "../controllers/sessions.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  current
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;