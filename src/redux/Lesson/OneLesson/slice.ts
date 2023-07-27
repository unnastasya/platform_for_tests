import { DoneWorkType } from "@/types/doneWork";
import { LessonType } from "@/types/lesson";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OneLessonStateType = {
	requestLessonId: string;
	oneLesson: LessonType;
	oneLessonIsLoading: boolean;
	oneLessonHasError: boolean;
};

const initialState: OneLessonStateType = {
	requestLessonId: "",
	oneLesson: {
		_id: "",
		name: "",
		description: "",
		doneCount: 0,
		allCriteriaRating: 0,
		questions: [],
		classes: [],
	},
	oneLessonIsLoading: false,
	oneLessonHasError: false,
};

const NAME = "oneLesson";

const requestOneLesson: CaseReducer<OneLessonStateType> = (state) => {
	state.oneLessonIsLoading = true;
	state.oneLessonHasError = false;
};

const successOneLesson: CaseReducer<
	OneLessonStateType,
	PayloadAction<LessonType>
> = (state, { payload }) => {
	state.oneLessonIsLoading = false;
	state.oneLessonHasError = false;
	state.oneLesson = payload;
};

const failureOneLesson: CaseReducer<OneLessonStateType> = (state) => {
	state.oneLessonIsLoading = false;
	state.oneLessonHasError = true;
};

const changeRequestLessonId: CaseReducer<
	OneLessonStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestLessonId = payload;
};

export const { reducer: OneLessonReducer, actions: OneLessonActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			requestOneLesson,
			successOneLesson,
			failureOneLesson,
			changeRequestLessonId,
		},
	});
