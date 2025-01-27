import {faker} from "@faker-js/faker";

export class ObjectivesService {

    MOCK_OBJECTIVES = [{

        id: faker.string.uuid(),
        title: faker.company.buzzPhrase(),
        keyResults: [
            {
                title: faker.company.catchPhrase(),
                initialValue: faker.number.int({min: 0, max: 10}),
                currentValue: faker.number.int({min: 10, max: 50}),
                targetValue: faker.number.int({min: 50, max: 100}),
                metrics: faker.company.buzzAdjective()
            },
            {
                title: faker.company.catchPhrase(),
                initialValue: faker.number.int({min: 0, max: 10}),
                currentValue: faker.number.int({min: 10, max: 50}),
                targetValue: faker.number.int({min: 50, max: 100}),
                metrics: faker.company.buzzAdjective()
            }]
    }];

    fetchAll() {
        return this.MOCK_OBJECTIVES;
    }
}