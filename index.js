import mongoose from "mongoose";
import express from "express";
import User from "./model.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI,
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

app.post("/user", async (req, res) => {
  try {
    const { name, age } = req.body;

    const newuser = new User({ name, age });
    await newuser.save();

    res.status(201).json({
      success: true,
      user: newuser,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: error,
    });
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
