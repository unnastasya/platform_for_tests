import { ApplicationState } from "../../store";

export const oneDoneWorkSelector = (state: ApplicationState) =>
	state.oneDoneWork;

export const oneDoneWorkDataSelector = (state: ApplicationState) =>
	oneDoneWorkSelector(state).oneDoneWork;
export const oneDoneWorkIsLoadingSelector = (state: ApplicationState) =>
	oneDoneWorkSelector(state).oneDoneWorkIsLoading;
export const oneDoneWorkIsErrorSelector = (state: ApplicationState) =>
	oneDoneWorkSelector(state).oneDoneWorkIsError;
export const oneDoneWorkRequestIdSelector = (state: ApplicationState) =>
	oneDoneWorkSelector(state).requestDoneWorkId;
