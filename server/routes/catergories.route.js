import express from 'express'
import {create_category} from '../controllers/categories.controller.js';

const router = express.Router();

router.post("/create_category", create_category);

export default router;