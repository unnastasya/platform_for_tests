import { ApplicationState } from "../store";

export const myWorksSelector = (state: ApplicationState) => state.myWorks;

export const myWorksDataSelector = (state: ApplicationState) =>
	myWorksSelector(state).myWorks;
export const myWorksIsLoadingSelector = (state: ApplicationState) =>
	myWorksSelector(state).myWorksIsLoading;
export const myWorksIsErrorSelector = (state: ApplicationState) =>
	myWorksSelector(state).myWorksIsError;
