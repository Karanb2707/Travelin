import { Router } from "express";
import { login, logout, me, register } from "../controllers/auth.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.post("/logout", auth, logout);

export default router;
