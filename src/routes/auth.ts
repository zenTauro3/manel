import express from "express";
import auth from "../controllers/auth";

const router = express.Router();

router.get("/", auth)

export default router;