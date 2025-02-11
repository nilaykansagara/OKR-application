import * as React from "react";
import {createContext} from "react";
import {ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";

type OKRProp = {
    objectives: ObjectiveType[] | null,
    setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[] | null>>,
    objectivesWithId: ObjectiveTypeWithId[],
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]>>
}

export const OKRContext = createContext<OKRProp>({
    objectives: null,
    setObjectives: () => {
    },
    objectivesWithId: [],
    setObjectivesWithId: () => {
    }
})

