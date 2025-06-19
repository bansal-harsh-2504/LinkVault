import mongoose, { Schema, model } from "mongoose";

const folderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Folder = model("Folder", folderSchema);
export default Folder;
