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
    createOne(@Body() dto: ObjectiveDto) {
        return this.objectivesService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() dto: ObjectiveDto) {
        const paramID = parseInt(id, 10);
        return this.objectivesService.updateOne(paramID, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        const paramId = parseInt(id, 10);
        return this.objectivesService.deleteOne(paramId);
    }
}
