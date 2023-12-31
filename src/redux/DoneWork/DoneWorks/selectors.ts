import { ApplicationState } from "../../store";

export const doneWorksSelector = (state: ApplicationState) => state.doneWorks;

export const doneWorksDataSelector = (state: ApplicationState) =>
	doneWorksSelector(state).doneWorks;
export const doneWorksIsLoadingSelector = (state: ApplicationState) =>
	doneWorksSelector(state).doneWorksIsLoading;
export const doneWorksIsErrorSelector = (state: ApplicationState) =>
	doneWorksSelector(state).doneWorksIsError;
export const requestUserIdSelector = (state: ApplicationState) =>
	doneWorksSelector(state).requestIdData;
export const openUserSelector = (state: ApplicationState) =>
	doneWorksSelector(state).openUser;
