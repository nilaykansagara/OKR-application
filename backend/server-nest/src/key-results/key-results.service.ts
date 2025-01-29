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

    async createOne(keyResultDto: KeyResultDto) {
        const keyResult = await this.prismaService.keyResult.create({data: keyResultDto});
        return keyResult;
    }
}
