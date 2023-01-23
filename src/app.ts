import express from "express";
import { finishedMovie, getPlatforms, postMovie, postUser, getGenreId, deleteMovie } from "./controllers/movieControllers.js";

const server = express();
server.use(express.json());

server.post("/movie", postMovie);
server.put("/movie", finishedMovie);
server.post("/user", postUser);
server.get("/platforms", getPlatforms);
server.get("/genre/:id", getGenreId);
server.delete("/movie", deleteMovie);

server.listen(4000, () => {console.log("server runing on port 4000")});