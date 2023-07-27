import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AddLessonStateType = {
	requestData: any;
	lessonIsAdded: boolean;
	isLoading: boolean;
	message: string;
	lessonId?: string;
};

const initialState: AddLessonStateType = {
	requestData: {},
	lessonIsAdded: false,
	isLoading: false,
	message: "",
};

const NAME = "addLesson";

const changeRequestData: CaseReducer<AddLessonStateType, PayloadAction<any>> = (
	state,
	{ payload }
) => {
	state.requestData = payload;
};

const addLesson: CaseReducer<AddLessonStateType> = (state) => {
	state.lessonIsAdded = false;
	state.isLoading = true;
};

const successAddLesson: CaseReducer<
	AddLessonStateType,
	PayloadAction<{ message: string; lessonId: string }>
> = (state, { payload }) => {
	state.lessonIsAdded = true;
	state.message = payload.message;
	state.lessonId = payload.lessonId;
	state.isLoading = false;
};

const failureAddLesson: CaseReducer<AddLessonStateType> = (state) => {
	state.lessonIsAdded = false;
	state.message = "Не удалось добавить урок";
	state.isLoading = false;
};

export const { reducer: AddLessonReducer, actions: AddLessonActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			changeRequestData,
			addLesson,
			successAddLesson,
			failureAddLesson,
		},
	});
