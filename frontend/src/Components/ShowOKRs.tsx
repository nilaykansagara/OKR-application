import {FaEdit, FaPlus, FaTrash} from 'react-icons/fa';
import {ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import * as React from "react";
import {useState} from "react";
import {AddKeyResultModal} from "./AddKeyResultModal.tsx";
import {UpdateObjectiveModal} from "./UpdateObjectiveModal.tsx";
import {useDeleteKeyResult, useDeleteObjective} from "../Custom-Hooks/CustomHooks.tsx";

type ShowOKRsProps = {
    objectivesWithId: ObjectiveTypeWithId[],
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]>>
}

export function ShowOKRs({
                             objectivesWithId,
                             setObjectivesWithId
                         }: ShowOKRsProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUpdateObjectiveOpen, setIsUpdateObjectiveOpen] = useState<boolean>(false);
    const [currentObjective, setCurrentObjective] = useState<ObjectiveTypeWithId | null>();


    const {deleteKeyResult} = useDeleteKeyResult({objectivesWithId, setObjectivesWithId});
    const {deleteObjective} = useDeleteObjective({objectivesWithId, setObjectivesWithId});

    return (
        <div>
            <div className=" px-4 space-y-4 mx-24 ">
                {objectivesWithId && objectivesWithId.length > 0 ? (
                    objectivesWithId.map((objective, index) => {
                        return (
                            <>
                                <div
                                    className="border-2 flex flex-col mx-6 my-3 bg-white space-y-2"
                                >
                                    <div className="flex border-b-2 px-8 bg-slate-100 py-2 justify-between">
                                        <p className="font-semibold text-xl">
                                            {index + 1}. {objective.title}
                                        </p>

                                        <div className="space-x-4 flex">
                                            <button
                                                onClick={() => {
                                                    deleteObjective(objective);
                                                }}>
                                                <FaTrash className="text-red-500 text-2xl"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCurrentObjective(objective)
                                                    setIsUpdateObjectiveOpen(true);
                                                }}>
                                                <FaEdit className="text-yellow-500 text-2xl"/>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="px-16 py-4 space-y-4">
                                        <div className="flex justify-between">
                                            <div className="font-medium text-lg">Key Results</div>
                                            <button
                                                className=" flex px-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-1 text-sm"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setCurrentObjective(objective);
                                                    console.log(objective);
                                                }}>
                                                <FaPlus className="mt-1 mr-2"/>Add Key Result
                                            </button>
                                        </div>
                                        {objective.keyResults.map((kr, i) => {
                                            console.log('..........kr', kr);
                                            return (
                                                <div
                                                    className="pl-4 border bg-gray-100 rounded-md py-2 px-2 shadow-lg space-y-2">
                          <span className="flex justify-between">
                            <h1>{kr.title}</h1>
                            <button
                                onClick={() => {
                                    deleteKeyResult(index, i, kr.id)
                                }}>
                              <FaTrash className="text-red-500"/>
                            </button>
                          </span><span className="flex justify-between">
                            <p>Initial: {kr.initial_value}</p>
                            <p>Current: {kr.current_value}</p>
                            <p>Target: {kr.target_value}</p>
                            <p>Metrics: {kr.metrics}</p>
                          </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        );
                    })
                ) : (
                    <div className="border-2 px-8 py-4 space-y-6 flex flex-col mx-6">
                        <p>No Objectives</p>
                    </div>
                )}
            </div>
            <AddKeyResultModal isOpen={isOpen} setObjectivesWithId={setObjectivesWithId}
                               currentObjectiveWithId={currentObjective}
                               objectivesWithId={objectivesWithId} setIsOpen={setIsOpen}></AddKeyResultModal>
            <UpdateObjectiveModal objective={currentObjective} isUpdateObjectiveOpen={isUpdateObjectiveOpen}
                                  setIsUpdateObjectiveOpen={setIsUpdateObjectiveOpen}></UpdateObjectiveModal>

        </div>
    )
}
