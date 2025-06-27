import Link from "../models/Link.js";
import mongoose from "mongoose";

export const getLinkById = async (req, res) => {
    const { id: linkId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(linkId)) {
        return res.status(400).json({ success: false, message: "Invalid link ID" });
    }
    try {
        const link = await Link.findById(linkId);
        if (!link) {
            return res.status(404).json({
                success: false, message: "Link not found"
            });
        }
        res.status(200).json({ success: true, data: link });
    } catch (err) {
        res.status(500).json({
            success: false, message: "Failed to fetch link", error: err.message
        });
    }
};

export const addLinkToFolder = async (req, res) => {
    const { folderId, title, url, notes } = req.body;

    if (folderId && !mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({ success: false, message: "Invalid folder ID" });
    }

    try {
        const existing = await Link.findOne({ folderId, url });
        if (existing) {
            return res.status(409).json({ success: false, message: "Link already exists in this folder" });
        }

        const newLink = new Link({ title: title || "", url, notes: notes || "", folderId });
        await newLink.save();
        res.status(201).json({ success: true, data: newLink });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to add link", error: err.message });
    }
};

export const updateLink = async (req, res) => {
    const { id: linkId } = req.params;
    const { title, url, notes, folderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(linkId)) {
        return res.status(400).json({ success: false, message: "Invalid link ID" });
    }

    try {
        const updated = await Link.findByIdAndUpdate(
            linkId,
            { $set: { title, url, notes, folderId } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Link not found" });
        }

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update link", error: err.message });
    }
};

export const deleteLink = async (req, res) => {
    const { id: linkId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(linkId)) {
        return res.status(400).json({ success: false, message: "Invalid link ID" });
    }

    try {
        const deleted = await Link.findByIdAndDelete(linkId);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Link not found" });
        }

        res.status(200).json({ success: true, message: "Link deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete link", error: err.message });
    }
};

export const searchLinks = async (req, res) => {
    const { query } = req.body;
    if (!query || query.trim() === "") {
        return res.status(400).json({ success: false, message: "Search query is required" });
    }

    try {
        const regex = new RegExp(query, "i");
        const results = await Link.find({
            $or: [
                { title: { $regex: regex } },
                { url: { $regex: regex } },
                { notes: { $regex: regex } },
            ],
        });

        res.status(200).json({ success: true, data: results });
    } catch (err) {
        res.status(500).json({ success: false, message: "Search failed", error: err.message });
    }
};
