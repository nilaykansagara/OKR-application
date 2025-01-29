import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {KeyResultsService} from "./key-results.service";
import {KeyResultDto} from "./key-result.dto";

@Controller('key-results')
export class KeyResultsController {
    constructor(private keyResultsService: KeyResultsService) {
    }

    @Get('/')
    getAll() {
        return this.keyResultsService.getAll();
    }

    @Post('/')
    createOne(@Body() keyResultDto: KeyResultDto) {
        return this.keyResultsService.createOne(keyResultDto);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() keyResultDto: KeyResultDto) {
        const keyResultId = parseInt(id, 10);
        return this.keyResultsService.updateOne(keyResultId, keyResultDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        const keyResultId = parseInt(id, 10);
        return this.keyResultsService.deleteOne(keyResultId);
    }
}
