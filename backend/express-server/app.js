import express from 'express';
import {PORT} from "./constants.js";
import cors from "cors";
import router from "./routers/objectives.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/objectives", router);

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}...`);
});