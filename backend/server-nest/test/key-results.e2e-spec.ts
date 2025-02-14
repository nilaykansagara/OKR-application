import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import * as request from 'supertest';

describe('Key-results(Integration)', () => {

    let app: INestApplication;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    describe('progress', () => {
        it('should return progress percentage', async () => {

            //Given
            const objectiveResponse = await request(app.getHttpServer()).post('/objectives/').send(
                {
                    title: "test objective"
                }
            );

            const createdObjective = objectiveResponse.body;

            const keyResultResponse = await request(app.getHttpServer()).post('/key-results/').send(
                {
                    title: "test keyresult",
                    initial_value: 0,
                    current_value: 1,
                    target_value: 3,
                    metrics: "keyresults",
                    objectiveId: createdObjective.id
                }
            );

            const createdKeyResult = keyResultResponse.body;

            //When
            const progressResponse = await request(app.getHttpServer()).get(`/key-results/progress/${createdKeyResult.id}`).expect(200);

            //Then
            const progress = JSON.parse(progressResponse.text);
            console.log(progress);
            expect(typeof progress).toEqual('number');
            expect(progress.toString()).toEqual("33.33");
        });
    });
});