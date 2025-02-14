import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {KeyResultDto} from "./key-result.dto";

@Injectable()
export class KeyResultsService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll() {
        const keyResults = await this.prismaService.keyResult.findMany();
        return keyResults;
    }

    async fetchUnique(id: number) {
        const keyResult = await this.prismaService.keyResult.findUnique({where: {id}});
        if (!keyResult) throw new Error("No keyResult found!");
        return keyResult;
    }

    async createOne(keyResultDto: KeyResultDto) {
        const keyResult = await this.prismaService.keyResult.create({data: keyResultDto});
        return keyResult;
    }

    async updateOne(id: number, keyResultDto: KeyResultDto) {
        const keyResult = await this.prismaService.keyResult.update({where: {id: id}, data: keyResultDto});
        return keyResult;
    }

    async deleteOne(id: number) {
        const keyResult = await this.prismaService.keyResult.delete({where: {id: id}});
        return keyResult;
    }

    async progress(id: number) {
        const keyResult = await this.fetchUnique(id);

        const percentage = (keyResult.current_value * 100 / keyResult.target_value);
        const roundedPercentage = percentage.toFixed(2);
        return roundedPercentage;
    }
}
