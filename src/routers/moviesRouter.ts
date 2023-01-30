import { Router } from "express";
import { finishedMovie, getPlatforms, postMovie, postUser, getGenreId, deleteMovie } from "../controllers/movieControllers.js";

const movieRouter = Router();

movieRouter.post("/movie", postMovie);
movieRouter.put("/movie", finishedMovie);
movieRouter.post("/user", postUser);
movieRouter.get("/platforms", getPlatforms);
movieRouter.get("/genre/:id", getGenreId);
movieRouter.delete("/movie", deleteMovie);

export default movieRouter;