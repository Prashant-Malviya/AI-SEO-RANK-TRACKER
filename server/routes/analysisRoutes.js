import express from "express";
import { analyzeUrl, deleteAnalysis, getAllAnalysis, getAnalysis } from "../controllers/analysisController.js";
import auth from '../middleware/auth.middleware.js'

const analysisRouter = express.Router();

analysisRouter.post('/analyze', auth, analyzeUrl);

analysisRouter.get("/list", auth, getAllAnalysis)
analysisRouter.get("/:id", auth, getAnalysis)
analysisRouter.delete("/:id", auth, deleteAnalysis)


export default analysisRouter;