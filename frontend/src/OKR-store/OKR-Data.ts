import {
    KeyResultDto,
    KeyResultServerType,
    KeyResultType,
    KeyResultWithId,
    ObjectiveDto,
    ObjectiveType,
    ObjectiveTypeWithId
} from "../Types/OKRTypes.ts";


// const jsonAPI = "http://localhost:3000/objectives";
const objectivesAPI = "http://16.16.27.255:5040/objectives";
const keyResultsAPI = "http://16.16.27.255:5040/key-results";
const objectiveGenAiAPI = "http://16.16.27.255:5040/objective-gen-ai";


async function getOKRData(): Promise<ObjectiveTypeWithId[]> {

    const objectives = await fetch(objectivesAPI, {method: "GET"});
    const keyResults = await fetch(keyResultsAPI, {method: "GET"});

    const objectivesResponse = await objectives.json();
    const keyResultsResponse = await keyResults.json();

    const objectivesWithId: ObjectiveTypeWithId[] = objectivesResponse.map((objective: ObjectiveTypeWithId) => {
        const relatedKeyResults = keyResultsResponse.filter((keyresult: KeyResultWithId) => keyresult.objectiveId === objective.id);
        const keyResults: KeyResultWithId[] = relatedKeyResults.map((keyresult: KeyResultWithId) => ({
            id: keyresult.id,
            title: keyresult.title,
            initialValue: keyresult.initial_value,
            currentValue: keyresult.current_value,
            targetValue: keyresult.target_value,
            metrics: keyresult.metrics,
        }));
        return {
            id: objective.id,
            title: objective.title,
            keyResults
        };
    })

    return objectivesWithId;
}

async function insertOKRData(objective: ObjectiveType): Promise<void> {
    console.log(objective);
    const objectiveToInsert: ObjectiveDto = {title: objective.title}
    const objectiveResponse = await fetch(objectivesAPI, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(objectiveToInsert)
    })
    const insertedObjective = await objectiveResponse.json()
    const keyResultsToInsert: KeyResultDto[] = objective.keyResults.map((keyresult: KeyResultType) => ({
        title: keyresult.title,
        initial_value: Number(keyresult.initialValue),
        current_value: Number(keyresult.currentValue),
        target_value: Number(keyresult.targetValue),
        metrics: keyresult.metrics,
        objectiveId: insertedObjective.id
    }))

    const keyResultsResponse: KeyResultServerType[] = await Promise.all(keyResultsToInsert.map(async (keyResultToInsert: KeyResultDto) => {
        const response = await fetch(keyResultsAPI, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(keyResultToInsert),
        });
        return response.json();  // Assuming the response is a JSON object
    }));
    insertedObjective.keyResults = keyResultsResponse;
    return insertedObjective;
}

async function updateOKRData(objective: ObjectiveTypeWithId): Promise<void> {
    const objectiveToUpdate: ObjectiveDto = {title: objective.title}
    const response = await fetch(objectivesAPI + "/" + objective.id, {
        headers: {"Content-Type": "application/json"},
        method: "PUT",
        body: JSON.stringify(objectiveToUpdate)
    });
    console.log('>>>>>>updated objective', response);
}

async function deleteOKRData(id: number): Promise<void> {
    try {
        await fetch(objectivesAPI + "/" + id, {method: "DELETE"})
    } catch (e) {
        console.log(e)
    }
}

async function insertKeyResultToObjective(keyresult: KeyResultDto): Promise<KeyResultWithId> {
    const response = await fetch(keyResultsAPI + "/", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(keyresult)
    })
    const insertedKeyResult: KeyResultWithId = await response.json();
    return insertedKeyResult;
}

async function deleteObjectiveKeyResult(id: number) {
    try {
        await fetch(keyResultsAPI + "/" + id, {method: "DELETE"})
    } catch (e) {
        console.log(e)
    }
}

async function getAIGeneratedObjective(query: string) {
    const response = await fetch(objectiveGenAiAPI + "?query=" + encodeURIComponent(query), {method: "GET"});
    if (response.ok) {
        const aiGeneratedObjective: ObjectiveType = await response.json();
        return aiGeneratedObjective;
    } else {
        console.error('Error fetching objective:', response.statusText);
    }
}


export {
    getOKRData,
    insertOKRData,
    updateOKRData,
    deleteOKRData,
    getAIGeneratedObjective,
    insertKeyResultToObjective,
    deleteObjectiveKeyResult
}
