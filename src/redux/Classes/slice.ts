import { ClassType } from "@/types/class";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ClassesStateType = {
	classes: ClassType[];
	classesIsLoading: boolean;
	classesIsError: boolean;
};

const initialState: ClassesStateType = {
	classes: [],
	classesIsLoading: false,
	classesIsError: false,
};

const NAME = "classes";

const requestClasses: CaseReducer<ClassesStateType> = (state) => {
	state.classesIsLoading = true;
	state.classesIsError = false;
};

const successClasses: CaseReducer<
	ClassesStateType,
	PayloadAction<ClassType[]>
> = (state, { payload }) => {
	state.classesIsLoading = false;
	state.classesIsError = false;
	state.classes = payload;
};

const failureClasses: CaseReducer<ClassesStateType> = (state) => {
	state.classesIsLoading = false;
	state.classesIsError = true;
};

export const { reducer: ClassesReducer, actions: ClassesActions } = createSlice(
	{
		name: NAME,
		initialState,
		reducers: {
			requestClasses,
			successClasses,
			failureClasses,
		},
	}
);