import {Module} from '@nestjs/common';
import {ObjectivesController} from './objectives.controller';
import {ObjectivesService} from './objectives.service';
import {DatabaseService} from "../database/database.service";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    controllers: [ObjectivesController],
    providers: [ObjectivesService, DatabaseService, PrismaService]
})
export class ObjectivesModule {
}
