"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_controller_1 = require("../controllers/food.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/reel", food_controller_1.getFood);
router.post("/reel", multer_middleware_1.upload.single("video"), auth_middleware_1.authFoodPartnerMiddleware, food_controller_1.addFood);
router.get("/reel/food-partner", auth_middleware_1.authFoodPartnerMiddleware, food_controller_1.getFoodItemsByPartner);
router.post("/reel/:id/like", auth_middleware_1.authUserMiddleware, food_controller_1.likeReel);
router.get("/partner/likes", auth_middleware_1.authFoodPartnerMiddleware, food_controller_1.getTotalLikesForFoodPartner);
// router.put("/reel/:id") //for update 
// router.delete("/reel/:id")
exports.default = router;
