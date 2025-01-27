import express from 'express';
import {ObjectivesService} from "./services/objectives.service.js";
import {ObjectivesController} from "./controllers/objectives.controller.js";
import {PORT} from "./constants.js";

const app = express();

app.use(express.json());

const objectivesService = new ObjectivesService();
const objectivesController = new ObjectivesController(objectivesService);

app.get('/objectives', (req, res) => {

    res.status(200).json(objectivesController.fetchAll(res));
});

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}...`);
});