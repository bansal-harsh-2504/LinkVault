import { getLinkById, addLinkToFolder, updateLink, deleteLink, searchLinks } from "../controllers/link.controller.js";
import express from "express";

const linkRouter = express.Router();

linkRouter.get("/:id", getLinkById);
linkRouter.post("/", addLinkToFolder);
linkRouter.put("/:id", updateLink);
linkRouter.delete("/:id", deleteLink);
linkRouter.post("/search", searchLinks);

export default linkRouter;
