import express from 'express';
import {ObjectivesService} from "./services/objectives.service.js";
import {ObjectivesController} from "./controllers/objectives.controller.js";
import {PORT} from "./constants.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const objectivesService = new ObjectivesService();
const objectivesController = new ObjectivesController(objectivesService);

app.get('/objectives', (req, res) => {
    res.status(200).json(objectivesController.fetchAll(res));
});

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}...`);
});