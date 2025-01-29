import {Body, Controller, Get, Post} from '@nestjs/common';
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
}
