import {ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import {v4 as uuidv4 } from "uuid";
const db = new Map<string, ObjectiveTypeWithId>()
const initialObjectives: ObjectiveTypeWithId[] = [
  {
    id:uuidv4(),
    title: "Build Team",
    keyResults: [
      {
        title: "Hire Frontend Developers",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      },
      {
        title: "Hire Backend Developers",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      }
    ]
  },
  {
    id:uuidv4(),
    title: "Sale the Product",
    keyResults: [
      {
        title: "Hire Salesman",
        initialValue: 0,
        targetValue: 5,
        currentValue: 1,
        metrics: "Developers"
      }
    ]
  }
]

initialObjectives.forEach((objective: ObjectiveTypeWithId)=>{
    console.log(db.values())
  db.set(objective.id, objective);
})


function getOKRData():Promise<ObjectiveTypeWithId[]>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(Array.from(db.values()));
      console.log(Array.from(db.values()));
    },3000)
  })
}

function insertOKRData(objective:ObjectiveType):Promise<void>{
  return new Promise((resolve)=>{

    const objectiveToBeAdded:ObjectiveTypeWithId = {
      id:uuidv4(),
      ...objective
    }
    setTimeout(()=>{
      db.set(uuidv4(), objectiveToBeAdded);
      resolve();
    },3000)
    console.log(objectiveToBeAdded);
  })
}

export{getOKRData,insertOKRData}
