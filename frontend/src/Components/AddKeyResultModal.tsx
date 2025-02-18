import * as React from "react";
import {useState} from "react";
import {KeyResultDto, KeyResultType, KeyResultWithId, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import {insertKeyResultToObjective, updateOKRData} from "../OKR-store/OKR-Data.ts";

type AddKeyResultModalProps = {
    isOpen: boolean,
    currentObjectiveWithId: ObjectiveTypeWithId | null | undefined,
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]>>,
    objectivesWithId: ObjectiveTypeWithId[],
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddKeyResultModal({
                                      isOpen,
                                      currentObjectiveWithId,
                                      setObjectivesWithId,
                                      objectivesWithId,
                                      setIsOpen
                                  }: AddKeyResultModalProps) {
    const [newKeyResult, setNewKeyResult] = useState<KeyResultType>(
        {
            title: "string",
            initialValue: 1,
            currentValue: 1,
            targetValue: 1,
            metrics: "string",
        }
    );

    const addKeyResult = () => {
        objectivesWithId.map(async (key: ObjectiveTypeWithId) => {
            if (key === currentObjectiveWithId) {
                console.log(key);
                const keyResultWithObjectiveId: KeyResultDto = {
                    title: newKeyResult.title,
                    initial_value: Number(newKeyResult.initialValue),
                    current_value: Number(newKeyResult.currentValue),
                    target_value: Number(newKeyResult.targetValue),
                    metrics: newKeyResult.metrics,
                    objectiveId: Number(currentObjectiveWithId.id)
                }
                const insertedKeyResult: KeyResultWithId = await insertKeyResultToObjective(keyResultWithObjectiveId);
                key.keyResults.push(insertedKeyResult);
                console.log(key);
            }
        })
        if (currentObjectiveWithId)
            updateOKRData(currentObjectiveWithId).then(() => (setObjectivesWithId([
                ...objectivesWithId,
            ])))
        console.log(objectivesWithId);
    };

    function handleChange(key: string, input: string | number) {
        const newKeyResultToBeAdded = {
            ...newKeyResult, [key]: input,
        };

        setNewKeyResult(newKeyResultToBeAdded);
    }

    return (

        <div>
            {isOpen ? (

                <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center ">
                    <div className="bg-white p-6 max-w-3xl space-y-2">
                        <div className="font-bold">Add Key Result</div>
                        < >
                            <input
                                className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                type="text"
                                id="keyresults"
                                placeholder="Key Result Title"
                                onChange={(e) => {
                                    handleChange("title", e.target.value)
                                }}
                            />
                            <div className="flex space-x-3">
                                <input
                                    className="shadow-lg  px-4 py-2 w-full  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Initial Value"
                                    onChange={(e) => {
                                        handleChange("initialValue", e.target.value)
                                    }}
                                />
                                <input
                                    className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Current Value"
                                    onChange={(e) => {
                                        handleChange("currentValue", e.target.value)
                                    }}
                                />
                                <input
                                    className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Target Value"
                                    onChange={(e) => {
                                        handleChange("targetValue", e.target.value)
                                    }}
                                />
                            </div>
                            <input
                                className="shadow-lg w-4/12 px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                type="text"
                                placeholder="Metrics"
                                onChange={(e) => {
                                    handleChange("metrics", e.target.value)
                                }}

                            />
                            <div className="flex space-x-1 pt-2 justify-end">
                                <button
                                    className="bg-blue-400 px-2 py-1 rounded-md text-white    hover:bg-blue-600 mr-6 block items-end"
                                    onClick={() => {
                                        addKeyResult()
                                        setIsOpen(false);
                                    }}
                                >
                                    Add Key Result
                                </button>
                                <button
                                    className="bg-gray-400 px-2 py-1 rounded-md text-white hover:bg-gray-600 mr-6 block items-end"
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    </div>
                </div>
            ) : (<div></div>)
            }
        </div>
    )
}