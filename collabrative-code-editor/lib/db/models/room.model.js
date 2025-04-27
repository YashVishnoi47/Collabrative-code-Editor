import mongoose, { model, models, Schema } from "mongoose";

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  codingLang: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  idPublic: {
    type: Boolean,
    default: false,
  },
  
  //   chatId: {
  //     type: String,
  //     required: true,
  //   },
});

const Room = models.Room || model("Room", roomSchema);
export default Room;
