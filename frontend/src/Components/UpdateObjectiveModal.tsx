import {ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import * as React from "react";
import {updateOKRData} from "../OKR-store/OKR-Data.ts";
import {useEffect, useState} from "react";

type UpdateObjectiveModalProps= {
    objective: ObjectiveTypeWithId | undefined | null,
    isUpdateObjectiveOpen : boolean,
    setIsUpdateObjectiveOpen :  React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateObjectiveModal = ({objective,isUpdateObjectiveOpen,setIsUpdateObjectiveOpen}:UpdateObjectiveModalProps) => {
    const [updatedObjectiveTitle, setUpdatedObjectiveTitle]= useState<string|undefined>(objective?.title);

    useEffect(() => {
        setUpdatedObjectiveTitle(objective?.title);
    }, [objective?.title]);

    return (

        <div>
            {isUpdateObjectiveOpen ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex flex-col items-center justify-center ">
                    <div className="bg-white p-6 max-w-3xl space-y-2">
                        <div className="font-bold text-2xl my-4 text-center">Update Objective Title</div>

                        <div className=" space-y-2">
                            <span>Enter Objective Title</span>
                            <input
                                className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                type="text"
                                id="keyresults"
                                value={updatedObjectiveTitle}
                                onChange={(e) => {
                                    setUpdatedObjectiveTitle(e.target.value);
                                }
                                }/>

                        </div>
                        <div className="flex space-x-1 pt-2 justify-end">
                            <button
                                className="bg-blue-400 px-2 py-1 rounded-md text-white    hover:bg-blue-600 mr-6 block items-end"
                                onClick={() => {
                                    //addKeyResult()
                                    console.log(objective)
                                    if(objective && updatedObjectiveTitle && updatedObjectiveTitle.length>0){
                                        objective.title=updatedObjectiveTitle
                                        updateOKRData(objective)
                                        setUpdatedObjectiveTitle("")
                                    }
                                    setIsUpdateObjectiveOpen(false);
                                }}
                            >
                                Update Objective Title
                            </button>
                            <button
                                className="bg-gray-400 px-2 py-1 rounded-md text-white hover:bg-gray-600 mr-6 block items-end"
                                onClick={() => {
                                    setIsUpdateObjectiveOpen(false)
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<div></div>)}
        </div>
    )
}