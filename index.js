import mongoose from "mongoose";
import express from "express";
import User from "./model.js";

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://arbinkumar015:RvIPHt0T1i91WmMo@cluster0.cueru.mongodb.net/Backend-kalvi"
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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
