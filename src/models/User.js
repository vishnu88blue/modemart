import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  userid:{
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cartItems: {
     type: Map,
    of: Number,
    default: {},
  },
}, {
  minimize: false,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;