import {Module} from '@nestjs/common';
import {ObjectivesModule} from './objectives/objectives.module';
import {DatabaseModule} from './database/database.module';
import {PrismaService} from './prisma/prisma.service';
import {KeyResultsModule} from './key-results/key-results.module';
import {ObjectiveGenAiModule} from './objective-gen-ai/objective-gen-ai.module';

@Module({
    imports: [ObjectivesModule, DatabaseModule, KeyResultsModule, ObjectiveGenAiModule],
    providers: [PrismaService]
})
export class AppModule {
}
