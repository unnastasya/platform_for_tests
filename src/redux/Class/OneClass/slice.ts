import { ClassType } from "@/types/class";
import { User } from "@/types/user";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type oneClassStateType = {
	oneClass: ClassType;
	oneClassIsLoading: boolean;
	oneClassIsError: boolean;
	requestClassId: string;
};

const initialState: oneClassStateType = {
	oneClass: {
		_id: 0,
		school: "",
		class: "",
		studentsCount: 0,
		lessons: [],
		authorId: "",
	},
	oneClassIsLoading: false,
	oneClassIsError: false,
	requestClassId: "",
};

const NAME = "oneClass";

const requestOneClass: CaseReducer<oneClassStateType> = (state) => {
	state.oneClassIsLoading = true;
	state.oneClassIsError = false;
};

const successOneClass: CaseReducer<
	oneClassStateType,
	PayloadAction<ClassType>
> = (state, { payload }) => {
	state.oneClassIsLoading = false;
	state.oneClassIsError = false;
	state.oneClass = payload;
};

const failureOneClass: CaseReducer<oneClassStateType> = (state) => {
	state.oneClassIsLoading = false;
	state.oneClassIsError = true;
};

const changeRequestClassId: CaseReducer<
	oneClassStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestClassId = payload;
};

export const { reducer: OneClassReducer, actions: OneClassActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			requestOneClass,
			successOneClass,
			failureOneClass,
			changeRequestClassId,
		},
	});
