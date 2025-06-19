import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    title: { type: String },
    url: { type: String, required: true },
    notes: { type: String },
    folderId: {
      type: Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Link = model("Link", linkSchema);
export default Link;
