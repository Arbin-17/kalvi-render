import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 90,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
