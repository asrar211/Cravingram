import { FoodPartner } from './../models/foodPartner.model';
import { Request, Response, Router } from "express";
import { loginFoodPartner, loginUser, logoutFoodPartner, logoutUser, registerFoodPartner, registerUser } from "../controllers/auth.controller";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);

router.get("/user/me", authUserMiddleware, (req, res) => {
    const user = (req as any).user;
    return res.json({ user });
});


router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);

router.get("/food-partner/me", authFoodPartnerMiddleware, (req, res) => {
    const foodPartner = (req as any).foodPartner;
    return res.json({ foodPartner });
});



export default router;