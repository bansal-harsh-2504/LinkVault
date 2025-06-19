import express from 'express';
import cors from 'cors';
import connectToDB from './config/connectToDB.js';
import authRouter from './routes/auth.routes.js';
import linkRouter from './routes/link.routes.js';
import folderRouter from './routes/folder.routes.js';
import authUser from './middleware/authUser.js';
import User from './models/User.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: [
            `${process.env.BASE_URL_FRONTEND}`,
            `${process.env.BASE_URL_BACKEND}`,
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use('/api/auth', authRouter);
app.use('/api/links', authUser, linkRouter);
app.use('/api/folders', authUser, folderRouter);

// Health check
app.get("/health", async (req, res) => {
    try {
        await User.findOne({}, "_id").lean();
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send("MongoDB connection failed");
    }
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("LinkVault is Running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
