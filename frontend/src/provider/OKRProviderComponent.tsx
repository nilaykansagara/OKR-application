import * as React from "react";
import {useState} from "react";
import {ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import {OKRContext} from "./OKRProvider.tsx";


export const OKRProviderComponent = ({children}:{children:React.ReactElement}) =>{
    const [objectives, setObjectives] = useState<ObjectiveType[] | null>(null);
    const [objectivesWithId, setObjectivesWithId] = useState<ObjectiveTypeWithId[] | null>(null);
    const OKR = {
        objectives, setObjectives, objectivesWithId, setObjectivesWithId
    }
    return (
        <OKRContext.Provider value={OKR} >
            {children}
        </OKRContext.Provider>
    )
}