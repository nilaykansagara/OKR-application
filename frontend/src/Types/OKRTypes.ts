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
export type ObjectiveTypeWithId = ObjectiveType & {
    id: string,
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