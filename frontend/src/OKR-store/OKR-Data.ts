import {ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";

const jsonAPI = "http://localhost:3000/objectives";


async function getOKRData(): Promise<ObjectiveTypeWithId[]> {
    const response = await fetch(jsonAPI, {method: "GET"});
    return await response.json();
}

async function insertOKRData(objective: ObjectiveType): Promise<void> {
    await fetch(jsonAPI, {method: "POST", body: JSON.stringify(objective)})
}

async function updateOKRData(objective: ObjectiveTypeWithId): Promise<void> {
    await fetch(jsonAPI+"/"+objective.id, {method: "PUT", body: JSON.stringify(objective)})
}

async function deleteOKRData(id:string): Promise<void> {
    try{
        await fetch(jsonAPI+"/"+id, {method: "DELETE"})
    }catch(e){
        console.log(e)
    }
}


export {getOKRData, insertOKRData, updateOKRData, deleteOKRData}
