import {createContext} from "react";
import {ObjectiveType} from "../Types/OKRTypes.ts";
import * as React from "react";

type OKRProp = {
    objectives: ObjectiveType[] | null,
    setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[]  | null>>
}

export const OKRContext = createContext<OKRProp>({
    objectives:null,
    setObjectives: () => {}
})

