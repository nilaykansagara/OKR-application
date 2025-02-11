export type KeyResultType = {
    title: string;
    initialValue: number;
    currentValue: number;
    targetValue: number;
    metrics: string;
};
export type ObjectiveType = {
    title: string;
    keyResults: KeyResultType[ ];
};
export type ObjectiveTypeWithId = {
    id: number,
    title: string,
    keyResults: KeyResultWithId[]
}
export type ObjectiveDto = {
    title: string;
}
export type KeyResultDto = {
    title: string;
    initial_value: number;
    current_value: number;
    target_value: number;
    metrics: string;
    objectiveId: number;
}

export type KeyResultWithId = {
    id: number,
    title: string;
    initial_value: number;
    current_value: number;
    target_value: number;
    metrics: string;
    objectiveId: number;
}

export type KeyResultServerType = {
    title: string;
    initial_value: number;
    current_value: number;
    target_value: number;
    metrics: string;
    objectiveId: string;
}