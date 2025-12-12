import { Router } from "express";
import { addFood, getFood, getFoodItemsByPartner, getTotalLikesForFoodPartner, likeReel } from "../controllers/food.controller";
import { upload } from "../middlewares/multer.middleware";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.get("/reel", getFood);
router.post("/reel", upload.single("video"),authFoodPartnerMiddleware, addFood);
router.get("/reel/food-partner", authFoodPartnerMiddleware, getFoodItemsByPartner);
router.post("/reel/:id/like", authUserMiddleware, likeReel);
router.get("/partner/likes", authFoodPartnerMiddleware, getTotalLikesForFoodPartner);
// router.put("/reel/:id") //for update 
// router.delete("/reel/:id")

export default router;