import { ClassType } from "@/types/class";
import { AddUserType } from "@/types/user";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AddClassStateType = {
	requestData: any;
	classIsAdded: boolean;
	isLoading: boolean;
	message: string;
	usersData: AddUserType[];
};

const initialState: AddClassStateType = {
	requestData: {},
	classIsAdded: false,
	isLoading: false,
	message: "",
	usersData: [],
};

const NAME = "addClass";

const changeRequestData: CaseReducer<AddClassStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.requestData = payload;
};

const addClass: CaseReducer<AddClassStateType> = (state) => {
	state.classIsAdded = false;
	state.isLoading = true;
};

const successAddClass: CaseReducer<
	AddClassStateType,
	PayloadAction<{ message: string; usersData: AddUserType[] }>
> = (state, { payload }) => {
	state.classIsAdded = true;
	state.usersData = payload.usersData;
	state.message = payload.message;
	state.isLoading = false;
};

const failureAddClass: CaseReducer<AddClassStateType> = (state) => {
	state.classIsAdded = false;
	state.usersData = [];
	state.message = "Не удалось добавить класс";
	state.isLoading = false;
};

export const { reducer: AddClassReducer, actions: AddClassActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			changeRequestData,
			addClass,
			successAddClass,
			failureAddClass,
		},
	});
