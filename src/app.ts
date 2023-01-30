import express from "express";
import movieRouter from "./routers/moviesRouter.js";
const server = express();
server.use(express.json());

server.use(movieRouter);

server.listen(4000, () => {console.log("server runing on port 4000")});