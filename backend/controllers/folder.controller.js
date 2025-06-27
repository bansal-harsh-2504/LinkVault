import Folder from "../models/Folder.js";
import Link from "../models/Link.js";
import mongoose from "mongoose";

export const getAllFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ userId: req.userId, parentFolderId: null });
        res.status(200).json({
            success: true,
            data: { folders },
        });
    } catch (err) {
        res.status(500).json({
            success: false, message: "Failed to fetch folders", error: err.message
        });
    }
};

export const getRootFoldersAndLinks = async (req, res) => {
    try {
        const subfolders = await Folder.find({ parentFolderId: null, userId: req.userId });

        const links = await Link.find({ folderId: null });
        res.status(200).json({
            success: true,
            data: { links, subfolders },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch root folder data", error: err.message });
    }
};

export const getSubFoldersAndLinks = async (req, res) => {
    const { id: folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ success: false, message: "Invalid folder ID" });
    }

    try {
        const folder = await Folder.findOne({ _id: folderId, userId: req.userId });
        if (!folder) {
            return res.status(404).json({ success: false, message: "Folder not found" });
        }

        const links = await Link.find({ folderId });
        const subfolders = await Folder.find({ parentFolderId: folderId, userId: req.userId });

        res.status(200).json({
            success: true,
            data: { folder, links, subfolders },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch folder", error: err.message });
    }
};

export const createFolder = async (req, res) => {
    const { name, parentFolderId } = req.body;

    try {
        const newFolder = new Folder({
            userId: req.userId,
            name,
            parentFolderId,
        });

        await newFolder.save();

        res.status(201).json({ success: true, data: newFolder });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create folder", error: err.message });
    }
};

export const updateFolderName = async (req, res) => {
    const { id: folderId } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ success: false, message: "Invalid folder ID" });
    }

    try {
        const updated = await Folder.findOneAndUpdate(
            { _id: folderId, userId: req.userId },
            { $set: { name } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Folder not found" });
        }

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update folder", error: err.message });
    }
};

export const deleteFolderAndItsData = async (req, res) => {
    const { id: folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ success: false, message: "Invalid folder ID" });
    }

    try {
        const folder = await Folder.findOne({ _id: folderId, userId: req.userId });
        if (!folder) {
            return res.status(404).json({ success: false, message: "Folder not found" });
        }

        await deleteFolderRecursively(folderId, req.userId);

        res.status(200).json({ success: true, message: "Folder and all contents deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete folder", error: err.message });
    }
};

const deleteFolderRecursively = async (folderId, userId) => {
    const subfolders = await Folder.find({ parentFolderId: folderId, userId });

    for (const subfolder of subfolders) {
        await deleteFolderRecursively(subfolder._id, userId);
    }

    await Link.deleteMany({ folderId });
    await Folder.findByIdAndDelete(folderId);
};
