import { getLinksInFolder, addLinkToFolder, updateLink, deleteLink, searchLinks } from "../controllers/link.controller.js";
import express from "express";

const linkRouter = express.Router();

linkRouter.get("/:id", getLinksInFolder);
linkRouter.post("/", addLinkToFolder);
linkRouter.put("/:id", updateLink);
linkRouter.delete("/:id", deleteLink);
linkRouter.get("/search", searchLinks);

export default linkRouter;
