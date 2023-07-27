import { ApplicationState } from "../../store";

export const classesSelector = (state: ApplicationState) => state.classes;

export const classesDataSelector = (state: ApplicationState) =>
	classesSelector(state).classes;
export const classesIsLoadingSelector = (state: ApplicationState) =>
	classesSelector(state).classesIsLoading;
export const classesIsErrorSelector = (state: ApplicationState) =>
	classesSelector(state).classesIsError;
