import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {ObjectiveDto} from "./objectives.dto";

@Injectable()
export class ObjectivesService {

    constructor(private prismaService: PrismaService) {
    }

    async getAll() {
        const objectives = await this.prismaService.objective.findMany();
        return objectives;
    }

    async createOne(objectiveDto: ObjectiveDto) {
        const objective = await this.prismaService.objective.create({data: objectiveDto});
        return objective;
    }

    async updateOne(id: number, objectiveDto: ObjectiveDto) {
        const objective = await this.prismaService.objective.update({where: {id: id}, data: objectiveDto});
        return objective;
    }

    async deleteOne(id: number) {
        const objective = await this.prismaService.objective.delete({where: {id: id}});
        return objective;
    }
}
