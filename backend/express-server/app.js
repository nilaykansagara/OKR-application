import express from 'express';
import {faker} from "@faker-js/faker";

const app = express();

app.use(express.json());

const PORT = 3005;

const MOCK_OBJECTIVES = []

function createKeyResults() {
    const KEY_RESULTS = []
    for (let j = 0; j < 4; j++) {
        const KEY_RESULT = {
            title: faker.company.catchPhrase(),
            initialValue: faker.number.int({min: 0, max: 10}),
            currentValue: faker.number.int({min: 10, max: 50}),
            targetValue: faker.number.int({min: 50, max: 100}),
            metrics: faker.company.buzzAdjective()
        }
        KEY_RESULTS.push(KEY_RESULT);
    }
    return KEY_RESULTS;
}

for (let i = 0; i < 5; i++) {

    const MOCK_OBJECTIVE = {
        id: faker.string.uuid(),
        title: faker.company.buzzPhrase(),
        keyResults: createKeyResults()
    };
    MOCK_OBJECTIVES.push(MOCK_OBJECTIVE);
}


app.get('/objectives', (req, res) => {
    res.status(200).json(MOCK_OBJECTIVES);
});

app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}...`);
});