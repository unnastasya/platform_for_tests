import { LoginUserType, UserType } from "@/types/user";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthStateType = {
	activeUser: UserType;
	activeUserId: string;

	requestLoginUserData: LoginUserType;
	isLoadingLoginUserData: boolean;
	hasErrorLoginUserData: boolean;
	loginErrorMessage?: string;

	isAuthUser: boolean;
};

const initialState: AuthStateType = {
	activeUser: { userId: "", fullName: "", role: "student" },
	activeUserId: "",

	requestLoginUserData: { login: "", password: "" },
	isLoadingLoginUserData: false,
	hasErrorLoginUserData: false,

	isAuthUser: false,
};

const NAME = "auth";

const changeRequestLoginData: CaseReducer<
	AuthStateType,
	PayloadAction<LoginUserType>
> = (state, { payload }) => {
	state.requestLoginUserData = payload;
};

const requestLogin: CaseReducer<AuthStateType> = (state) => {
	state.isLoadingLoginUserData = true;
	state.hasErrorLoginUserData = false;
};

const successLogin: CaseReducer<AuthStateType, PayloadAction<UserType>> = (
	state,
	{ payload }
) => {
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = false;
	state.activeUser = payload;
	state.activeUserId = payload.userId;
	state.loginErrorMessage = "";
	state.isAuthUser = true;
};

const failureLogin: CaseReducer<AuthStateType, PayloadAction<string>> = (
	state,
	{ payload }
) => {
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = true;
	state.loginErrorMessage = payload;
};

const logout: CaseReducer<AuthStateType> = (state) => {
	state.activeUser = { userId: "", fullName: "", role: "student" };
	state.isAuthUser = false;
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = false;
};

const reset: CaseReducer<AuthStateType> = (state) => {
	state.isLoadingLoginUserData = false;
	state.hasErrorLoginUserData = false;
};

export const { reducer: AuthReducer, actions: AuthActions } = createSlice({
	name: NAME,
	initialState,
	reducers: {
		changeRequestLoginData,
		requestLogin,
		successLogin,
		failureLogin,
		logout,
		reset,
	},
});
