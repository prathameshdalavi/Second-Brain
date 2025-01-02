import { Schema, model } from "mongoose";
import { Types } from "mongoose";


const UserSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    password: String
})
const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true }
})
const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true }
})

const userModel = model("User", UserSchema)
const contentModel = model("Content", ContentSchema)
const linkModel = model("link", linkSchema)

export {
    userModel,
    contentModel,
    linkModel,
}