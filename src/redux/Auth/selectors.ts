import { ApplicationState } from "../store";

export const authSelector = (state: ApplicationState) => state.auth;

export const activeUserSelector = (state: ApplicationState) =>
	authSelector(state).activeUser;
export const activeUserIdSelector = (state: ApplicationState) =>
	authSelector(state).activeUserId;
export const requestLoginUserDataSelector = (state: ApplicationState) =>
	authSelector(state).requestLoginUserData;
export const isLoadingLoginUserDataSelector = (state: ApplicationState) =>
	authSelector(state).isLoadingLoginUserData;
export const hasErrorLoginUserDataSelector = (state: ApplicationState) =>
	authSelector(state).hasErrorLoginUserData;
export const loginErrorMessageSelector = (state: ApplicationState) =>
	authSelector(state).loginErrorMessage;
export const isAuthUserSelector = (state: ApplicationState) =>
	authSelector(state).isAuthUser;
