"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const middleware_1 = require("./middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
// const { ObjectId } = require("mongoose").Types;
const db_1 = require("./db");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://prathameshdalavi04:patya131104@cluster0.8rk6v.mongodb.net/second-brain");
    });
}
main();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(email, password);
        const requireBody = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(6).max(20)
        });
        try {
            const parseData = requireBody.safeParse(req.body);
            if (!parseData.success) {
                res.status(400).json({
                    message: "Invalid Data",
                    error: parseData.error.issues
                });
                return;
            }
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                res.json({
                    message: "Invalid Data",
                    error: error.errors
                });
                return;
            }
        }
        try {
            const existingUser = yield db_1.userModel.findOne({ email: email });
            if (existingUser) {
                res.status(409).json({
                    message: "User Already Exists"
                });
                return;
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            console.log('6');
            console.log(hashPassword, typeof hashPassword, email, typeof email);
            yield db_1.userModel.create({
                email: email,
                password: hashPassword
            });
            res.json({
                message: "You are signed Up"
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error occured during signup",
            });
        }
    });
});
app.post("/api/v1/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            res.status(400).json({
                message: "Email and Password are required"
            });
            return;
        }
        try {
            const response = yield db_1.userModel.findOne({ email: email });
            if (!response) {
                res.status(401).json({
                    message: "User does not exist"
                });
                return;
            }
            const UserId = response._id.toString();
            if (response.password && typeof response.password === "string") {
                const passwordMatch = yield bcrypt_1.default.compare(password, response.password);
                if (passwordMatch) {
                    const token = jsonwebtoken_1.default.sign({ UserId: UserId }, middleware_1.JWT_SECRET_KEY, { expiresIn: "1d" });
                    res.json({
                        message: "You are signed in",
                        token: token
                    });
                    return;
                }
                else {
                    res.status(401).json({ message: "Incorrect Password" });
                    return;
                }
            }
        }
        catch (error) {
            res.status(500).json({
                message: "Error occured during signin",
            });
        }
    });
});
app.post("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const newId= new ObjectId(req.body.UserId.UserId);
        const { link, type, title } = req.body;
        try {
            const content = yield db_1.contentModel.create({
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
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield db_1.contentModel.find({ userId: req.body.UserId.UserId });
            res.status(201).json({
                data: content
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Error occurred while saving content. Please try again."
            });
        }
    });
});
app.delete("/api/v1/content", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentId = req.body.contentId;
        try {
            yield db_1.contentModel.deleteMany({ userId: req.body.UserId.UserId, _id: contentId });
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
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const enableShare = req.body.shareLink === "true"; // Convert input to boolean
            const existingLink = yield db_1.linkModel.findOne({ userId: req.body.UserId.UserId });
            if (enableShare) {
                let hash;
                if (existingLink) {
                    hash = existingLink.hash;
                }
                else {
                    // Create a new shareable link with a unique hash
                    const newLink = yield db_1.linkModel.create({
                        hash: (0, utils_1.randomString)(10),
                        userId: req.body.UserId.UserId,
                    });
                    hash = newLink.hash;
                }
                res.json({
                    message: "Shareable link created successfully.",
                    hash,
                });
            }
            else {
                // Disable the shareable link by deleting it
                if (existingLink) {
                    yield db_1.linkModel.deleteOne({ userId: req.body.UserId.UserId });
                }
                res.json({
                    message: "Shareable link removed successfully.",
                });
            }
        }
        catch (error) {
            console.error("Error updating shareable link:", error);
            res.status(500).json({
                message: "Error occurred while updating shareable link.",
                error,
            });
        }
    });
});
app.get("/api/v1/brain/:shareLink", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the link by its hash
            const link = yield db_1.linkModel.findOne({ hash: req.params.shareLink });
            if (!link) {
                res.status(404).json({
                    message: "No content available for this link",
                });
                return;
            }
            // Fetch the content linked to the userId in the found link
            const content = yield db_1.contentModel.find({ userId: link.userId });
            res.status(200).json({
                message: "Shared content fetched successfully",
                data: content,
            });
        }
        catch (error) {
            console.error("Error fetching shared content:", error);
            res.status(500).json({
                message: "Error occurred while fetching shared content.",
            });
        }
    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
