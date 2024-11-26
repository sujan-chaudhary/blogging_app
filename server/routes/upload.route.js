import express from 'express';
const router = express.Router();

import upload from '../middlewares/upload.middleware.js';
import uploadImage from '../controllers/upload.controller.js';

router.post("/upload", upload.single("image"), uploadImage);

export default router;