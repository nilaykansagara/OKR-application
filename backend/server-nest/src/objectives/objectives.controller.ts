import {Body, Controller, Get, Post} from '@nestjs/common';
import {ObjectivesService} from './objectives.service';
import {ObjectiveDto} from "./objectives.dto";

@Controller('objectives')
export class ObjectivesController {
    constructor(private readonly objectivesService: ObjectivesService) {
    }

    @Get('/')
    getAll() {
        return this.objectivesService.getAll();
    }

    @Post('/')
    createOne(@Body() createObjectiveDto: ObjectiveDto) {
        return this.objectivesService.createOne(createObjectiveDto);
    }
}
