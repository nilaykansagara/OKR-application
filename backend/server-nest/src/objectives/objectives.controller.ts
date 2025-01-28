import {Body, Controller, Get, Post} from '@nestjs/common';
import {ObjectivesService} from './objectives.service';
import {CreateObjectiveDto} from "./objectives.dto";

@Controller('objectives')
export class ObjectivesController {
    constructor(private readonly objectivesService: ObjectivesService) {
    }

    @Get('/')
    getAll() {
        return this.objectivesService.getAll();
    }

    @Post('/')

    create(@Body() createObjectiveDto: CreateObjectiveDto) {
        return this.objectivesService.create(createObjectiveDto);
    }
}
