import * as React from "react";
import {useState} from "react";
import {ObjectiveType} from "../Types/OKRTypes.ts";
import {OKRContext} from "./OKRProvider.tsx";


export const OKRProviderComponent = ({children}:{children:React.ReactElement}) =>{
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