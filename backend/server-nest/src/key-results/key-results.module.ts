import {Module} from '@nestjs/common';
import {KeyResultsController} from './key-results.controller';
import {KeyResultsService} from './key-results.service';
import {PrismaService} from "../prisma/prisma.service";
import {KeyResultCompletionService} from "./key-result-completion.service";

@Module({
    controllers: [KeyResultsController],
    providers: [KeyResultsService, PrismaService, KeyResultCompletionService]
})
export class KeyResultsModule {
}
