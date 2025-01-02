"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    password: String
});
const contentTypes = ["image", "video", "article", "audio"];
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true, enum: contentTypes },
    title: { type: String, required: true },
    userId: { type: mongoose_2.Types.ObjectId, ref: "User", required: true }
});
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_2.Types.ObjectId, ref: "User", required: true }
});
const userModel = (0, mongoose_1.model)("User", UserSchema);
exports.userModel = userModel;
const contentModel = (0, mongoose_1.model)("Content", ContentSchema);
exports.contentModel = contentModel;
const linkModel = (0, mongoose_1.model)("link", linkSchema);
exports.linkModel = linkModel;
