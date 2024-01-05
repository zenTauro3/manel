"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./controllers/auth"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const app = (0, express_1.default)();
//middlewares
app.use((0, cors_1.default)({ origin: process.env.CLIENT_DOMAIN }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("common"));
app.use((0, helmet_1.default)());
//routes
app.use("/auth", auth_1.default);
app.use("/register", register_1.default);
app.use("/login", login_1.default);
mongoose_1.default
    .connect(process.env.DB || "")
    .then(() => app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.SERVER_DOMAIN}`)))
    .catch((error) => console.error(error));
