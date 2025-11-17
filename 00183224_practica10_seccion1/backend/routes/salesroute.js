import { Router } from "express";
import controllers from "../controllers/controllerSales.js";
import { verifyToken } from '../middleware/token.js';

const router = Router();

router.post("/", verifyToken, controllers.postSales);
router.get("/", verifyToken, controllers.getSalesCustomer);
router.get("/report", verifyToken, controllers.totalSalesByCustomer);

export default router