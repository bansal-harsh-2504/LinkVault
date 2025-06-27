import { getAllFolders, getRootFoldersAndLinks, createFolder, updateFolderName, deleteFolderAndItsData, getSubFoldersAndLinks } from "../controllers/folder.controller.js";
import express from "express";

const folderRouter = express.Router();

folderRouter.get("/", getAllFolders);
folderRouter.get("/root", getRootFoldersAndLinks);
folderRouter.get("/:id", getSubFoldersAndLinks);
folderRouter.post("/", createFolder);
folderRouter.put("/:id", updateFolderName);
folderRouter.delete("/:id", deleteFolderAndItsData);

export default folderRouter;
