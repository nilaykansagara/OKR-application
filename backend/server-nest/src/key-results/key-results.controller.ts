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

    @Post('/is-key-result-completed')
    isComplete(@Body() keyResultDto: KeyResultDto) {
        const keyResultCompletionServiceResponse = this.keyResultCompletionService.isComplete(keyResultDto);
        return keyResultCompletionServiceResponse;
    }

    @Get('/progress/:id')
    async progress(@Param('id') id: string) {
        const keyResultId = parseInt(id, 10);
        return this.keyResultsService.progress(keyResultId);
    }
}
