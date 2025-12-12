"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.connectDB)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://cravingram.vercel.app",
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello CRAVINGRAM");
});
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const food_routes_1 = __importDefault(require("./routes/food.routes"));
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/food", food_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
