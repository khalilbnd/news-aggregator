import express from "express";
import { GetNewsController, PutNewsAsSeen } from "../controller/NewsController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get('/api/news', GetNewsController);
router.put('/api/news/:guid', verifyToken, PutNewsAsSeen);

export const newsRouter = router;