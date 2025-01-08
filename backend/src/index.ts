import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { z } from "zod";
import { userMiddleware, JWT_SECRET_KEY } from "./middleware";
import bcrypt from "bcrypt";
// const { ObjectId } = require("mongoose").Types;
import { userModel, contentModel, linkModel } from "./db";
import { randomString } from "./utils";
import cors from "cors";

const app = express();
async function main() {
    await mongoose.connect("mongodb+srv://prathameshdalavi04:patya131104@cluster0.8rk6v.mongodb.net/second-brain");
}
main()
app.use(cors());
app.use(express.json());
app.post("/api/v1/signup", async function (req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20)
    })

    try {
        const parseData = requireBody.safeParse(req.body);
        if (!parseData.success) {
            res.status(400).json({
                message: "Invalid Data",
                error: parseData.error.issues
            })
            return;
        }
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.json({
                message: "Invalid Data",
                error: error.errors
            })
            return;
        }
    }
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({
                message: "User Already Exists"
            })
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('6');
        console.log(hashPassword, typeof hashPassword, email, typeof email);
        await userModel.create({
            email: email,
            password: hashPassword
        })
        res.json({
            message: "You are signed Up"
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Error occured during signup",
        })
    }

})
app.post("/api/v1/signin", async function (req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        res.status(400).json({
            message: "Email and Password are required"
        })
        return
    }
    try {
        const response = await userModel.findOne({ email: email });
        if (!response) {
            res.status(401).json({
                message: "User does not exist"
            })
            return
        }
        const UserId: string = response._id.toString()
        if (response.password && typeof response.password === "string") {
            const passwordMatch = await bcrypt.compare(password, response.password);
            if (passwordMatch) {
                const token = Jwt.sign(
                    { UserId: UserId },
                    JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.json({
                    message: "You are signed in",
                    token: token
                });
                return
            } else {
                res.status(401).json({ message: "Incorrect Password" });
                return
            }
        }

    }
    catch (error) {
        res.status(500).json({
            message: "Error occured during signin",
        })
    }
}
)
app.post("/api/v1/content", userMiddleware, async function (req, res) {
    // const newId= new ObjectId(req.body.UserId.UserId);
    const { link, type, title } = req.body;
    try {
        const content = await contentModel.create({
            link: link,
            type: type,
            title: title,
            userId: req.body.UserId.UserId
        });
        res.status(201).json({
            message: "Content created successfully",
            data: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred while saving content. Please try again."
        });
    }
})
app.get("/api/v1/content", userMiddleware, async function (req, res) {
    try {
        const content = await contentModel.find({ userId: req.body.UserId.UserId });
        res.status(201).json({
            data: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred while saving content. Please try again."
        });
    }
})
app.delete("/api/v1/content", userMiddleware, async function (req, res) {
    const contentId = req.body.contentId;
    try {
        await contentModel.deleteMany({ userId: req.body.UserId.UserId, _id: contentId });
        console.log("1");
        res.status(201).json({
            message: "Content deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error occurred while saving content. Please try again."
        });
    }
})
app.post("/api/v1/brain/share", userMiddleware, async function (req, res) {
    try {
        const enableShare = req.body.shareLink === "true"; // Convert input to boolean
        const existingLink = await linkModel.findOne({ userId: req.body.UserId.UserId });

        if (enableShare) {
            let hash;
            if (existingLink) {
                hash = existingLink.hash;
            } else {
                // Create a new shareable link with a unique hash
                const newLink = await linkModel.create({
                    hash: randomString(10),
                    userId: req.body.UserId.UserId,
                });
                hash = newLink.hash;
            }
            res.json({
                message: "Shareable link created successfully.",
                hash,
            });
        } else {
            // Disable the shareable link by deleting it
            if (existingLink) {
                await linkModel.deleteOne({ userId: req.body.UserId.UserId });
            }
            res.json({
                message: "Shareable link removed successfully.",
            });
        }
    } catch (error) {
        console.error("Error updating shareable link:", error);
        res.status(500).json({
            message: "Error occurred while updating shareable link.",
            error,
        });
    }
});


app.get("/api/v1/brain/:shareLink", async function (req, res) {
    try {
        // Find the link by its hash
        const link = await linkModel.findOne({ hash: req.params.shareLink });
        if (!link) {
            res.status(404).json({
                message: "No content available for this link",
            });
            return;
        }

        // Fetch the content linked to the userId in the found link
        const content = await contentModel.find({ userId: link.userId });
        res.status(200).json({
            message: "Shared content fetched successfully",
            data: content,
        });
    } catch (error) {
        console.error("Error fetching shared content:", error);
        res.status(500).json({
            message: "Error occurred while fetching shared content.",
        });
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})