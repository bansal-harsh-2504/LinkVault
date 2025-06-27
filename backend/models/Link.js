import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    title: { type: String },
    url: { type: String, required: true },
    notes: { type: String },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Link = model("Link", linkSchema);
export default Link;
