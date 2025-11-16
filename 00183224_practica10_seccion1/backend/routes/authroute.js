import authentication from '../authentication/authentication.js';
import { Router } from "express";

const router = Router();

router.post("/signin", authentication.signin);
router.post("/signup", authentication.signup);

export default router