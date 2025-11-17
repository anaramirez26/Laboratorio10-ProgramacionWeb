import { Router } from "express";
import controllers from "../controllers/controllerCustomers.js";
import { verifyToken } from '../middleware/token.js';

const router = Router();

router.get("/", verifyToken, controllers.getCustomers);
router.get("/search", verifyToken, controllers.getCustomerByCode);

export default router