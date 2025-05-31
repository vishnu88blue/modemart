import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:{
    type: stringify,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Boolean,
    default: {},
  },
}, {
  minimize: false,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;