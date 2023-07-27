import { LessonType } from "@/types/lesson";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DoneWorksStateType = {
	lessons: LessonType[];
	lessonsIsLoading: boolean;
	lessonsHasError: boolean;
};

const initialState: DoneWorksStateType = {
	lessons: [],
	lessonsIsLoading: false,
	lessonsHasError: false,
};

const NAME = "lessons";

const requestLessons: CaseReducer<DoneWorksStateType> = (state) => {
	state.lessonsIsLoading = true;
	state.lessonsHasError = false;
};

const successLessons: CaseReducer<
	DoneWorksStateType,
	PayloadAction<LessonType[]>
> = (state, { payload }) => {
	state.lessonsIsLoading = false;
	state.lessonsHasError = false;
	state.lessons = payload;
};

const failureLessons: CaseReducer<DoneWorksStateType> = (state) => {
	state.lessonsIsLoading = false;
	state.lessonsHasError = true;
};

export const { reducer: LessonsReducer, actions: LessonsActions } = createSlice(
	{
		name: NAME,
		initialState,
		reducers: {
			requestLessons,
			successLessons,
			failureLessons,
		},
	}
);
