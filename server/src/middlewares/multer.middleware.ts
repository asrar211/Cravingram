import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1000 * 1024 * 1024,
    },
});