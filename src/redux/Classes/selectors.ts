import { ApplicationState } from "../store";

export const cartSelector = (state: ApplicationState) => state.classes;

export const classesSelector = (state: ApplicationState) =>
	cartSelector(state).classes;
export const classesIsLoadingSelector = (state: ApplicationState) =>
	cartSelector(state).classesIsLoading;
export const classesIsErrorSelector = (state: ApplicationState) =>
	cartSelector(state).classesIsError;
