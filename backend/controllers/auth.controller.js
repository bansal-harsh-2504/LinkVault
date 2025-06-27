import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all the fields",
                success: false,
            });
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if (user) {
            return res.status(400).json({
                message: "Email already exists.",
                success: false,
            });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            email,
            passwordHash: hashedPassword,
        });
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (err) {
        console.log("Error in user Register controller. Error: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all the fields",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials!",
                success: false,
            });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Invalid credentials!",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        user = {
            _id: user.id,
            email: user.email
        };

        return res
            .status(200)
            .json({ success: true, user, token });
    } catch (err) {
        console.log("Error in user log in controller. Error: ", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
