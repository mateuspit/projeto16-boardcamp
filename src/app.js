import express from "express";
import cors from "cors";
import apiPort from "./constants/apiPort.js";
//import router from


const app = express();
app.use(cors());
app.use(express.json());

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

