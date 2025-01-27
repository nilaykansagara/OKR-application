export class ObjectivesController {
    constructor(objectiveService) {
        this.objectiveService = objectiveService;
    }

    fetchAll(res) {
        return res.status(200).json(this.objectiveService.fetchAll());
    }
}
