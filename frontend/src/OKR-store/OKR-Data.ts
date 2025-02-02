import {KeyResultType, ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";

const jsonAPI = "http://localhost:3000/objectives";
const objectivesAPI = "http://localhost:5040/objectives";
const keyResultsAPI = "http://localhost:5040/key-results";


async function getOKRData(): Promise<ObjectiveTypeWithId[]> {

    const objectives = await fetch(objectivesAPI, {method: "GET"});
    const keyResults = await fetch(keyResultsAPI, {method: "GET"});

    const objectivesResponse = await objectives.json();
    const keyResultsResponse = await keyResults.json();

    const objectivesWithId: ObjectiveTypeWithId[] = objectivesResponse.map((objective) => {
        const relatedKeyResults = keyResultsResponse.filter(keyresult => keyresult.objectiveId === objective.id);
        const keyResults: KeyResultType[] = relatedKeyResults.map(keyresult => ({
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
    await fetch(jsonAPI, {method: "POST", body: JSON.stringify(objective)})
}

async function updateOKRData(objective: ObjectiveTypeWithId): Promise<void> {
    await fetch(jsonAPI + "/" + objective.id, {method: "PUT", body: JSON.stringify(objective)})
}

async function deleteOKRData(id: string): Promise<void> {
    try {
        await fetch(jsonAPI + "/" + id, {method: "DELETE"})
    } catch (e) {
        console.log(e)
    }
}


export {getOKRData, insertOKRData, updateOKRData, deleteOKRData}
