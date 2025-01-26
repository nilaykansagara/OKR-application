import {updateOKRData} from "../OKR-store/OKR-Data.ts";
import {ObjectiveTypeWithId} from "../Types/OKRTypes.ts";
import * as React from "react";
import {useCallback} from "react";

type useDeleteKeyResultProps = {
    objectivesWithId: ObjectiveTypeWithId[],
    setObjectivesWithId: React.Dispatch<React.SetStateAction<ObjectiveTypeWithId[]>>
}

function useDeleteKeyResult({objectivesWithId, setObjectivesWithId}: useDeleteKeyResultProps) {
    const deleteKeyResult = useCallback((objIndex: number, keyResultIndex: number) => {
            const selectedObjective = objectivesWithId[objIndex];
            const keyResultToDelete = selectedObjective.keyResults[keyResultIndex];
            selectedObjective.keyResults = selectedObjective.keyResults.filter(key => key != keyResultToDelete);
            updateOKRData({...objectivesWithId[objIndex]}).then(() => {
                setObjectivesWithId([...objectivesWithId])
            });
        },
        [objectivesWithId,setObjectivesWithId]
    );
    return {deleteKeyResult};
}

export{useDeleteKeyResult}