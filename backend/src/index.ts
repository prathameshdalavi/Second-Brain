import express, { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {  z } from "zod";
import { userMiddleware ,JWT_SECRET_KEY} from "./middleware";
import bcrypt from "bcrypt";
// const { ObjectId } = require("mongoose").Types;
import { userModel, contentModel, linkModel } from "./db";
import { randomString } from "./utils";
import cors from "cors";

const app = express();
async function main() {
    await mongoose.connect("mongodb+srv://prathameshdalavi04:patya131104@cluster0.8rk6v.mongodb.net/Second_brain");
}
main()
app.use(cors());
app.use(express.json());
app.post("/api/v1/signup", async function (req:Request, res:Response) {
    const { userName, email, password } = req.body;
    const requireBody = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20),
        userName: z.string().min(3).max(20)
    })

    try {
        const parseData=requireBody.safeParse(req.body);
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
        await userModel.create({
            email: email,
            password: hashPassword,
            userName: userName
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
app.post("/api/v1/signin", async function (req:Request, res:Response) {
    const { email, password } = req.body;
    if (!email || !password) {
         res.status(400).json({
            message: "Email and Password are required"
        })
        return 
    }
    try {
        const response= await userModel.findOne({ email: email });
        if (!response) {
            res.status(401).json({
                message: "User does not exist"
            })
            return
        }
        const UserId:string= response._id.toString()
        if (response.password && typeof response.password === "string") {
            const passwordMatch = await bcrypt.compare(password, response.password);
            if (passwordMatch) {
                const token = Jwt.sign(
                    {UserId: UserId},
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
app.post("/api/v1/content",userMiddleware,async function (req, res) {
    // const newId= new ObjectId(req.body.UserId.UserId);
    const { link, type, title } = req.body;
    try{
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
app.get("/api/v1/content",userMiddleware,async function (req, res) {
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
app.delete("/api/v1/content",userMiddleware,async function (req, res) {
    try{
        await contentModel.deleteMany({ userId: req.body.UserId.UserId
         });
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
app.post("/api/v1/brain/share",userMiddleware,async function (req, res) {
    const shareLink=req.body.shareLink;
    if(shareLink){
        await linkModel.create({
            hash:randomString(10),
            userId: req.body.UserId.UserId
        })
    }
    else{
        await linkModel.deleteOne({
            userId: req.body.UserId.UserId
        })
    }
    res.json({
        message:"Updated sharable link"
    })
})
app.get("/api/v1/brain/:shareLink", function (req, res) {

})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});