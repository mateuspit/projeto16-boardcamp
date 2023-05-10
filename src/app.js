//const express = require("express");
import express from "express";
//const cors = require("cors");
import cors from "cors";
//const apiPort = require("./constants/apiPort");
import apiPort from "./constants/apiPort.js";
//const router = require("./router");
import router from "./routes/index.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

