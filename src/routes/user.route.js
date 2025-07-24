import { createUser, getAllUsers, loginUser } from "../controller/user.controller.js";
import { Router } from "express";

const router = Router();

router.get("/",getAllUsers);
router.post("/create", createUser);
router.post("/login", loginUser);

export default router;