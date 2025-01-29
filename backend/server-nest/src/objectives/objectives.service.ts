import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateObjectiveDto} from "./objectives.dto";

@Injectable()
export class ObjectivesService {

    constructor(private prismaService: PrismaService) {
    }

    async getAll() {
        const objectives = await this.prismaService.objective.findMany();
        return objectives;
    }

    async createOne(createObjectiveDto: CreateObjectiveDto) {
        // const objectiveTitle = createObjectiveDto.title;
        const objective = await this.prismaService.objective.create({data: createObjectiveDto});
        return objective;
    }
}
