import { Module } from '@nestjs/common';
import { ObjectiveGenAiController } from './objective-gen-ai.controller';
import { ObjectiveGenAiService } from './objective-gen-ai.service';

@Module({
  controllers: [ObjectiveGenAiController],
  providers: [ObjectiveGenAiService]
})
export class ObjectiveGenAiModule {}
