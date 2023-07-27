import { ApplicationState } from "../../store";

export const addClassSelector = (state: ApplicationState) => state.addClass;

export const addClassRequestDataSelector = (state: ApplicationState) =>
	addClassSelector(state).requestData;
export const addClassMessageSelector = (state: ApplicationState) =>
	addClassSelector(state).message;
export const classIsAddedSelector = (state: ApplicationState) =>
	addClassSelector(state).classIsAdded;
export const addClassUsersDataSelector = (state: ApplicationState) =>
	addClassSelector(state).usersData;
export const addClassIsLoadingSelector = (state: ApplicationState) =>
	addClassSelector(state).isLoading;
