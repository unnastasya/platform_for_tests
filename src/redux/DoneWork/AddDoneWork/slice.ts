import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AddDoneWorkStateType = {
	requestData: any;
	doneWorkIsAdded: boolean;
	isLoading: boolean;
	message: string;
	doneWorkId?: string;
};

const initialState: AddDoneWorkStateType = {
	requestData: {},
	doneWorkIsAdded: false,
	isLoading: false,
	message: "",
};

const NAME = "addDoneWork";

const changeRequestData: CaseReducer<
	AddDoneWorkStateType,
	PayloadAction<any>
> = (state, { payload }) => {
	state.requestData = payload;
};

const addDoneWork: CaseReducer<AddDoneWorkStateType> = (state) => {
	state.doneWorkIsAdded = false;
	state.isLoading = true;
};

const successAddDoneWork: CaseReducer<
	AddDoneWorkStateType,
	PayloadAction<{ message: string; doneWorkId: string }>
> = (state, { payload }) => {
	state.doneWorkIsAdded = true;
	state.message = payload.message;
	state.doneWorkId = payload.doneWorkId;
	state.isLoading = false;
};

const failureAddDoneWork: CaseReducer<AddDoneWorkStateType> = (state) => {
	state.doneWorkIsAdded = false;
	state.message = "Не удалось добавить класс";
	state.isLoading = false;
};

export const { reducer: AddDoneWorkReducer, actions: AddDoneWorkActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			changeRequestData,
			addDoneWork,
			successAddDoneWork,
			failureAddDoneWork,
		},
	});
