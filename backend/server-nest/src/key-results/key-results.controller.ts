import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {KeyResultsService} from "./key-results.service";
import {KeyResultDto} from "./key-result.dto";
import {KeyResultCompletionService} from "./key-result-completion.service";

@Controller('key-results')
export class KeyResultsController {

    constructor(private keyResultsService: KeyResultsService, private keyResultCompletionService: KeyResultCompletionService) {
    }

    @Get('/')
    getAll() {
        return this.keyResultsService.getAll();
    }

    @Post('/')
    createOne(@Body() dto: KeyResultDto) {
        return this.keyResultsService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() dto: KeyResultDto) {
        const paramId = parseInt(id, 10);
        return this.keyResultsService.updateOne(paramId, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        const paramId = parseInt(id, 10);
        return this.keyResultsService.deleteOne(paramId);
    }

    @Get('/progress/:id')
    progress(@Param('id') id: string) {
        const paramId = parseInt(id, 10);
        return this.keyResultsService.progress(paramId);
    }
}
