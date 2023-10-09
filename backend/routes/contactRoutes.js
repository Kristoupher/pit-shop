import express from "express";
const router = express.Router();

import { sendEmail } from "../controllers/contactController.js";

router.route("/").post(sendEmail);

export default router;