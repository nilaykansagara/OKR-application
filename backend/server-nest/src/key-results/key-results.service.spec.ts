import {KeyResultsService} from "./key-results.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {ObjectiveDto} from "../objectives/objectives.dto";

describe("KeyResultsService", () => {

    let keyResultsService: KeyResultsService;
    let prismaService: PrismaService;
    let module: TestingModule;
    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [KeyResultsService, PrismaService]
        }).compile();
        keyResultsService = module.get<KeyResultsService>(KeyResultsService);
        prismaService = module.get<PrismaService>(PrismaService)
    })

    describe("fetch unique function", () => {
        let objective: ObjectiveDto & { id: number }
        beforeEach(async () => {
            await prismaService.keyResult.deleteMany();
            await prismaService.objective.deleteMany();
            objective = await prismaService.objective.create({
                data: {title: "dummy objective 2",}
            })
        })

        it("should return unique key result", async () => {
            const response = await keyResultsService.fetchUnique(3);
            console.log(response);
            expect(response).toBeDefined();
        })

        it("should return existing key result", async () => {

            const dummyKeyResult = {
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 100,
                metrics: "dummy metrics",
                objectiveId: objective.id
            }

            const keyResult = await prismaService.keyResult.create({
                data: dummyKeyResult
            });
            expect(keyResult).toEqual({...keyResult, id: expect.any(Number)})
        })
    })
})