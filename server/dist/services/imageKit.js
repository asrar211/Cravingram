"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const imagekit_1 = __importDefault(require("imagekit"));
const imagekit = new imagekit_1.default({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
const uploadFile = async (file, fileName) => {
    try {
        const result = await imagekit.upload({
            file,
            fileName,
        });
        return result;
    }
    catch (error) {
        console.error("ImageKit upload error:", error);
        throw new Error("File upload failed");
    }
};
exports.uploadFile = uploadFile;
