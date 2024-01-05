import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now() },
});

export default mongoose.model("users", user);
