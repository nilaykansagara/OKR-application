import {useEffect, useState} from "react";
import {KeyResultType, ObjectiveType, ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import {getAIGeneratedObjective, getOKRData, insertOKRData} from "../OKR-store/OKR-Data.ts";

type CreateOkrFormProps = {
    objectives: ObjectiveType[] | null,
    setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[] | null>>,
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[] | null>>
}

const CreateOkrForm = ({
                           objectives,
                           setObjectives,
                           setObjectivesWithId,
                       }: CreateOkrFormProps) => {
    const [newObjective, setNewObjective] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [objectiveGenerationQuery, setObjectiveGenerationQuery] = useState<string>("");
    const [keyResults, setKeyResults] = useState<KeyResultType[]>([{
        title: "",
        initialValue: null,
        currentValue: null,
        targetValue: null,
        metrics: "",
    }]);

    useEffect(() => {

    }, [objectiveGenerationQuery]);

    async function generateObjectiveFromQuery() {
        setIsLoading(true);
        const aiGeneratedObjective: ObjectiveType | undefined = await getAIGeneratedObjective(objectiveGenerationQuery);
        console.log(aiGeneratedObjective);
        if (aiGeneratedObjective) {

            setNewObjective(aiGeneratedObjective.title);
            setKeyResults(aiGeneratedObjective.keyResults.map((kr) => ({
                title: kr.title || "string",
                initialValue: kr.initialValue || 1,
                currentValue: kr.currentValue || 1,
                targetValue: kr.targetValue || 1,
                metrics: kr.metrics || "string",
            })));
        }
        setIsLoading(false);
    }

    async function addObjective() {
        setObjectives([
            ...objectives,
            {
                title: newObjective,
                keyResults: keyResults,
            },
        ]);
        await insertOKRData({
            title: newObjective,
            keyResults: keyResults,
        })
        const newOkRDataAdded = await getOKRData()
        setObjectivesWithId([...newOkRDataAdded]);
        setObjectiveGenerationQuery("");
        setNewObjective("")
        setKeyResults([{
            title: "",
            initialValue: 0,
            currentValue: 0,
            targetValue: 0,
            metrics: "",
        }]);

    }

    function handleChange(key: string, input: string | number, index: number) {
        const keyResultToUpdate = keyResults[index];
        keyResults[index] = {...keyResultToUpdate, [key]: input};
        setKeyResults([...keyResults]);
    }


    const addKeyResult = () => {
        setKeyResults([
            ...keyResults,
            {
                title: "",
                initialValue: 0,
                currentValue: 0,
                targetValue: 0,
                metrics: "",
            },
        ]);


    };
    return (
        <div className=" px-4 max-w-12xl mx-24 flex">
            <div className={`border-2 px-8 py-4 space-y-5 flex flex-col mx-6 my-3 ${isLoading ? "blur-sm " : ""}`}>
                {isLoading && (
                    <div className="p-15xl absolute inset-0 bg-white opacity-50 flex justify-center items-center z-10">
                        <div
                            className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <p className="text-2xl opacity-70 my-4 font-mono font-bold">
                    Create Objective Form
                </p>

                <div className="space-y-2">
                    <label className="block" htmlFor="objective">
                        Objective
                    </label>
                    <input
                        className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                        type="text"
                        id="objective"
                        placeholder="Add Objective Title"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="block">Key Results</p>

                    {keyResults.map((_, index) => {
                        return (
                            <>
                                <input
                                    className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                    type="text"
                                    id="keyresults"
                                    placeholder="Key Result Title"
                                    value={keyResults[index].title}
                                    onChange={(e) => {
                                        handleChange("title", e.target.value, index)
                                    }}
                                    key={index}
                                />
                                <div className="flex space-x-3">
                                    <input
                                        className="shadow-lg  px-4 py-2 w-full  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                        type="text"
                                        placeholder="Initial Value"
                                        value={keyResults[index].initialValue}
                                        onChange={(e) => {
                                            handleChange("initialValue", e.target.value, index)
                                        }}
                                    />
                                    <input
                                        className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                        type="text"
                                        placeholder="Current Value"
                                        value={keyResults[index].currentValue}
                                        onChange={(e) => {
                                            handleChange("currentValue", e.target.value, index)
                                        }}
                                    />
                                    <input
                                        className="shadow-lg w-full px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                        type="text"
                                        placeholder="Target Value"
                                        value={keyResults[index].targetValue}
                                        onChange={(e) => {
                                            handleChange("targetValue", e.target.value, index)
                                        }}
                                    />
                                </div>
                                <input
                                    className="shadow-lg w-4/12 px-4 py-2  focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md"
                                    type="text"
                                    placeholder="Metrics"
                                    value={keyResults[index].metrics}
                                    onChange={(e) => {
                                        handleChange("metrics", e.target.value, index)
                                    }}

                                />
                            </>
                        );
                    })}
                </div>

                <button
                    className="bg-blue-400 px-2 self-start py-1 rounded-md text-white ring-2  hover:bg-blue-500 mr-6 block"
                    onClick={addKeyResult}
                >
                    Add Key Result
                </button>
                <button
                    className="bg-green-500 px-2 self-end py-1 rounded-md text-white border-2 hover:bg-green-600"
                    onClick={addObjective}
                >
                    Add Objective
                </button>
            </div>
            <div className="border-2 px-8 py-4 space-y-5 flex flex-col mx-6 my-3">
                <p className="text-2xl opacity-70 my-4 font-mono font-bold">
                    Create Objective With GenAI
                </p>
                <textarea rows={4}
                          className="focus:border-2 focus:border-blue-500 outline-0 border-2 border-gray-300 rounded-md px-3 py-2"
                          placeholder="Enter your objective description here..."
                          id="query"
                          value={objectiveGenerationQuery}
                          onChange={(e) => setObjectiveGenerationQuery(e.target.value)}>
                </textarea>
                <button
                    className="bg-green-500 px-2 self-end py-1 rounded-md text-white border-2 hover:bg-green-600"
                    onClick={generateObjectiveFromQuery}
                >
                    Create Objective
                </button>
            </div>
        </div>
    );
}

export {CreateOkrForm}