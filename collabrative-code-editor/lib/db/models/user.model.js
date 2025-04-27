import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  aboutUser: {
    type: String,
    default: "No description provided",
  },
  RoomsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      dateCreated: Date.now(),
      ref: "Room",
      default: [],
    },
  ],
  RoomsJoined: [
    {
      type: mongoose.Schema.Types.ObjectId,
      dateJoined: Date.now(),
      ref: "Room",
      default: [],
    },
  ],
});

const User = models.User || model("User", userSchema);
export default User;
