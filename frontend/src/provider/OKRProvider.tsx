import {createContext} from "react";
import {ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import * as React from "react";

type OKRProp = {
    objectives: ObjectiveType[] | null,
    setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]  | null>>,
    objectivesWithId: ObjectiveTypeWithId[] | null,
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]  | null>>
}

export const OKRContext = createContext<OKRProp>({
    objectives:null,
    setObjectives: () => {},
    objectivesWithId:null,
    setObjectivesWithId: () => {}
})

