import { verifyToken } from "../middleware/token.js";
import { Router } from "express";
import controllers from "../controllers/controllers.js";

const router = Router();

router.get("/", verifyToken, controllers.displayHome);
router.get("/users", verifyToken, controllers.getUsers);
router.get("/users/:id", verifyToken, controllers.getUserById);
router.put("/users/:id", verifyToken, controllers.updateUser);
router.delete("/users/:id", verifyToken, controllers.deleteUser);

router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Protected data accessed", user: req.user });
});

export default router;