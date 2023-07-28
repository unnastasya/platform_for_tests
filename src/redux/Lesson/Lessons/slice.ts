import { LessonType } from "@/types/lesson";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LessonsStateType = {
	lessons: LessonType[];
	lessonsIsLoading: boolean;
	lessonsHasError: boolean;
};

const initialState: LessonsStateType = {
	lessons: [],
	lessonsIsLoading: false,
	lessonsHasError: false,
};

const NAME = "lessons";

const requestLessons: CaseReducer<LessonsStateType> = (state) => {
	state.lessonsIsLoading = true;
	state.lessonsHasError = false;
};

const successLessons: CaseReducer<
	LessonsStateType,
	PayloadAction<LessonType[]>
> = (state, { payload }) => {
	state.lessonsIsLoading = false;
	state.lessonsHasError = false;
	state.lessons = payload;
};

const failureLessons: CaseReducer<LessonsStateType> = (state) => {
	state.lessonsIsLoading = false;
	state.lessonsHasError = true;
};

const requestActiveUsersOpenLessons: CaseReducer<LessonsStateType> = (
	state
) => {
	state.lessonsIsLoading = true;
	state.lessonsHasError = false;
};

export const { reducer: LessonsReducer, actions: LessonsActions } = createSlice(
	{
		name: NAME,
		initialState,
		reducers: {
			requestLessons,
			successLessons,
			failureLessons,
			requestActiveUsersOpenLessons,
		},
	}
);
