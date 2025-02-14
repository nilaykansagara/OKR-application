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
            const progressResponse = await request(app.getHttpServer()).get('/key-results/progress/1');
            expect(progressResponse.text).toBeDefined();
        });
    });
});