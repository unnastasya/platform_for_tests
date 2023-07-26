import { ClassType } from "@/types/class";
import { User } from "@/types/user";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type oneClassStateType = {
	oneClass: ClassType;
	oneClassIsLoading: boolean;
	oneClassIsError: boolean;
	oneClassStudents: User[];
	requestClassId: string;
};

const initialState: oneClassStateType = {
	oneClass: { _id: 0, school: "", class: "", studentsCount: 0, lessons: [] },
	oneClassIsLoading: false,
	oneClassIsError: false,
	oneClassStudents: [],
	requestClassId: "",
};

const NAME = "classes";

const requestOneClass: CaseReducer<oneClassStateType> = (state) => {
	state.oneClassIsLoading = true;
	state.oneClassIsError = false;
};

const successOneClass: CaseReducer<
	oneClassStateType,
	PayloadAction<{ oneClass: ClassType; classStudents: User[] }>
> = (state, { payload }) => {
	state.oneClassIsLoading = false;
	state.oneClassIsError = false;
	state.oneClass = payload.oneClass;
	state.oneClassStudents = payload.classStudents;
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
