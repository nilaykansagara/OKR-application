import {createContext, useState} from "react";
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

export const OKRProvider = ({children}:{children:React.ReactElement}) =>{
    const [objectives, setObjectives] = useState<ObjectiveType[] | null>(null);
    const OKR = {
        objectives, setObjectives
    }
    return (
        <OKRContext.Provider value={OKR} >
            {children}
        </OKRContext.Provider>
    )
}