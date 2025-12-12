"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/user/register", auth_controller_1.registerUser);
router.post("/user/login", auth_controller_1.loginUser);
router.get("/user/logout", auth_controller_1.logoutUser);
router.get("/user/me", auth_middleware_1.authUserMiddleware, (req, res) => {
    const user = req.user;
    return res.json({ user });
});
router.post("/food-partner/register", auth_controller_1.registerFoodPartner);
router.post("/food-partner/login", auth_controller_1.loginFoodPartner);
router.get("/food-partner/logout", auth_controller_1.logoutFoodPartner);
router.get("/food-partner/me", auth_middleware_1.authFoodPartnerMiddleware, (req, res) => {
    const foodPartner = req.foodPartner;
    return res.json({ foodPartner });
});
exports.default = router;
