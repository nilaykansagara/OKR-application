import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {CreateObjectiveDto} from "./objectives.dto";

@Injectable()
export class ObjectivesService {

    constructor(private databaseService: DatabaseService) {
    }

    async getAll() {
        const objectives = await this.databaseService.query("select * from objectives");
        return objectives.rows;
    }

    async create(createObjectiveDto: CreateObjectiveDto) {
        const createdObjective = await this.databaseService.query("insert into objectives (title) values ($1) returning *", [createObjectiveDto.title]);
        return createdObjective.rows[0];
    }
}
