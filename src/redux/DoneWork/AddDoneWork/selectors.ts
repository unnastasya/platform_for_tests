import { ApplicationState } from "../../store";

export const addDoneWorkSelector = (state: ApplicationState) =>
	state.addDoneWork;

export const addDoneWorkRequestDataSelector = (state: ApplicationState) =>
	addDoneWorkSelector(state).requestData;
export const addDoneWorkMessageSelector = (state: ApplicationState) =>
	addDoneWorkSelector(state).message;
export const addDoneWorkIsAddedSelector = (state: ApplicationState) =>
	addDoneWorkSelector(state).doneWorkIsAdded;
export const addDoneWorkIsLoadingSelector = (state: ApplicationState) =>
	addDoneWorkSelector(state).isLoading;
export const addDoneWorkIdSelector = (state: ApplicationState) =>
	addDoneWorkSelector(state).doneWorkId;
