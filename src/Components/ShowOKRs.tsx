import {ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import * as React from "react";
import {AddKeyResultModal} from "./AddKeyResultModal.tsx";
import {useState} from "react";

type ShowOKRsProps = {
    objectivesWithId: ObjectiveTypeWithId[],
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]>>
}

export function ShowOKRs({
                             objectivesWithId,
                             setObjectivesWithId
                         }: ShowOKRsProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    //const [isOpenUpdateObjectiveModal, setIsOpenUpdateObjectiveModal] = useState<boolean>(false);
    const [currentObjective, setCurrentObjective] = useState<ObjectiveTypeWithId | null>();

    function deleteKeyResult(objIndex: number, keyResultIndex: number) {

        const keyResultToDelete = objectivesWithId[objIndex].keyResults[keyResultIndex];
        objectivesWithId[objIndex].keyResults = objectivesWithId[objIndex].keyResults.filter(key => key != keyResultToDelete);
        setObjectivesWithId([...objectivesWithId]);
    }

    function deleteObjective(objectiveWithId: ObjectiveTypeWithId) {

            const objectiveTemp = objectivesWithId.filter(key => key != objectiveWithId);
            setObjectivesWithId([...objectiveTemp]);
    }

    function updateObjective(objective: ObjectiveTypeWithId) {
        console.log("objective to be updated is:", objective)

    }

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

                                        <div className="space-x-4">
                                            <button
                                                className="px-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white py-1 text-sm"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setCurrentObjective(objective);
                                                    console.log(objective);
                                                }}>
                                                Add Key Result
                                            </button>
                                            <button
                                                className=" px-2 bg-red-500 hover:bg-red-600 rounded-md text-white py-1 text-sm "
                                                onClick={() => {
                                                    deleteObjective(objective);
                                                }}>
                                                Delete Objective
                                            </button>
                                            <button
                                                className=" px-2 bg-red-500 hover:bg-red-600 rounded-md text-white py-1 text-sm "
                                                onClick={() => {
                                                    updateObjective(objective);
                                                    //setIsOpenUpdateObjectiveModal(true)
                                                }}>
                                                Update Objective
                                            </button>

                                        </div>
                                    </div>

                                    <div className="px-16 py-4 space-y-4">
                                        <div className="font-medium text-lg">Key Results</div>

                                        {objective.keyResults.map((kr, i) => {
                                            return (
                                                <div
                                                    className="pl-4 border bg-gray-100 rounded-md py-2 px-2 shadow-lg space-y-2">
                          <span className="flex justify-between">
                            <h1>{kr.title}</h1>
                            <button className="border bg-red-500 hover:bg-red-600 rounded-md px-2 text-white"
                                    onClick={() => {
                                        deleteKeyResult(index, i)
                                    }}>
                              Delete
                            </button>
                          </span>


                                                    <span className="flex justify-between">
                            <p>Initial: {kr.initialValue}</p>
                            <p>Current: {kr.currentValue}</p>
                            <p>Target: {kr.targetValue}</p>
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

        </div>


    )
}