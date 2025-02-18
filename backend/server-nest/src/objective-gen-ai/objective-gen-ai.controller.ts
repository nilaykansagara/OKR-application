import {Controller, Get, Query} from '@nestjs/common';
import {ObjectiveGenAiService} from "./objective-gen-ai.service";

@Controller('objective-gen-ai')
export class ObjectiveGenAiController {

    constructor(private objectiveGenAiService: ObjectiveGenAiService) {
    }

    @Get('/')
    getResponse(@Query('query') query: string): Promise<any> {
        return this.objectiveGenAiService.getResponse(query);
    }
    
}
