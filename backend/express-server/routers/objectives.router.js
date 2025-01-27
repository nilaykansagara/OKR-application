import express from "express";
import {ObjectivesController} from "../controllers/objectives.controller.js";
import {ObjectivesService} from "../services/objectives.service.js";

const router = express.Router();
const objectivesService = new ObjectivesService();
const objectivesController = new ObjectivesController(objectivesService)
router.use('/', (req, res) => {
    const objectives = objectivesController.fetchAll(res);
    res.json(objectives);
})

export default router;