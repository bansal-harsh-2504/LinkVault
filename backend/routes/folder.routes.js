import { getAllFolders, getFolderWithLinks, createFolder, updateFolder, deleteFolder } from "../controllers/folder.controller.js";
import express from "express";

const folderRouter = express.Router();

folderRouter.get("/all", getAllFolders);
folderRouter.get("/:id", getFolderWithLinks);
folderRouter.post("/", createFolder);
folderRouter.put("/:id", updateFolder);
folderRouter.delete("/:id", deleteFolder);

export default folderRouter;
