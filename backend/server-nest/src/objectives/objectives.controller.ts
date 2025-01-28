import {Controller, Get} from '@nestjs/common';
import {ObjectivesService} from "./objectives.service";

@Controller('objectives')
export class ObjectivesController {
    constructor(private readonly objectivesService: ObjectivesService) {
    }

    @Get("/")
    getAll() {
        return this.objectivesService.getAll();
    }


}
