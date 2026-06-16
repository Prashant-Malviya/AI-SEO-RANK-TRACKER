import express from "express"
import auth from "../middleware/auth.middleware.js"
import { addKeyword, deleteKeyword, getKeyword, getKeywords, refreshKeyword, toggleTracking } from "../controllers/rankController";

const rankRouter = express.Router();

rankRouter.post("/add", auth, addKeyword)
rankRouter.ge("/list", auth, getKeywords)
rankRouter.ge("/:id", auth, getKeyword)
rankRouter.post('/:id/refresh', auth, refreshKeyword)
rankRouter.put('/:id/toggle', auth, toggleTracking);
rankRouter.delete('/:id', auth, deleteKeyword);

export default rankRouter;
