import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
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
    createOne(@Body() objectiveDto: ObjectiveDto) {
        return this.objectivesService.createOne(objectiveDto);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() objectiveDto: ObjectiveDto) {
        const objectiveId = parseInt(id, 10);
        return this.objectivesService.updateOne(objectiveId, objectiveDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        const objectiveId = parseInt(id, 10);
        return this.objectivesService.deleteOne(objectiveId);
    }
}
