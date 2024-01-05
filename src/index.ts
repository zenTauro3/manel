import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import auth from "./controllers/auth";
import login from "./routes/login";
import register from "./routes/register";

const app = express();

//middlewares
app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(helmet());

//routes
app.use("/auth", auth);
app.use("/register", register);
app.use("/login", login);

mongoose
  .connect(process.env.DB || "")
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running at ${process.env.SERVER_DOMAIN}`)
    )
  )
  .catch((error) => console.error(error));
