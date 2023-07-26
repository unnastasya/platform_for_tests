import { ApplicationState } from "../store";

export const oneClassSelector = (state: ApplicationState) => state.oneClass;

export const oneClassDataSelector = (state: ApplicationState) =>
	oneClassSelector(state).oneClass;
export const oneClassIsLoadingSelector = (state: ApplicationState) =>
	oneClassSelector(state).oneClassIsLoading;
export const oneClassIsErrorSelector = (state: ApplicationState) =>
	oneClassSelector(state).oneClassIsError;
export const oneClassStudentsSelector = (state: ApplicationState) =>
	oneClassSelector(state).oneClassStudents;
export const requestClassIdSelector = (state: ApplicationState) =>
	oneClassSelector(state).requestClassId;
