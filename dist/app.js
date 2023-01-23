import express from "express";
import { sendTest } from "./controllers/algo.js";
var server = express();
server.get("/teste", sendTest);
server.listen(4000, function () { console.log("server runing on port 4000"); });
