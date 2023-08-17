import { DoneWorkType } from "@/types/doneWork";
import { LessonType } from "@/types/lesson";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OneDoneWorkStateType = {
	requestDoneWorkId: string;
	oneDoneWork: DoneWorkType;
	oneDoneWorksLesson: LessonType;
	oneDoneWorkIsLoading: boolean;
	oneDoneWorkIsError: boolean;
};

const initialState: OneDoneWorkStateType = {
	requestDoneWorkId: "",
	oneDoneWork: {
		_id: "",
		lessonId: {
			_id: "",
			name: "",
			description: "",
			doneCount: 0,
			allCriteriaRating: 0,
			questions: [],
			classes: [],
		},
		answers: [],
		isVerified: false,
		school: "",
		class: "",
		student: {},
		allCriteriaRating: 0,
        successCriterias: [],
	},
	oneDoneWorksLesson: {
		_id: "",
		name: "",
		description: "",
		doneCount: 0,
		allCriteriaRating: 0,
		questions: [],
		classes: [],
	},
	oneDoneWorkIsLoading: false,
	oneDoneWorkIsError: false,
};

const NAME = "oneDoneWork";

const requestOneDoneWork: CaseReducer<OneDoneWorkStateType> = (state) => {
	state.oneDoneWorkIsLoading = true;
	state.oneDoneWorkIsError = false;
};

const successOneDoneWork: CaseReducer<
	OneDoneWorkStateType,
	PayloadAction<{ doneWork: DoneWorkType; lesson: LessonType }>
> = (state, { payload }) => {
	state.oneDoneWorkIsLoading = false;
	state.oneDoneWorkIsError = false;
	state.oneDoneWork = payload.doneWork;
	state.oneDoneWorksLesson = payload.lesson;
};

const failureOneDoneWork: CaseReducer<OneDoneWorkStateType> = (state) => {
	state.oneDoneWorkIsLoading = false;
	state.oneDoneWorkIsError = true;
};

const changeRequestDoneWorkId: CaseReducer<
	OneDoneWorkStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestDoneWorkId = payload;
};

export const { reducer: OneDoneWorkReducer, actions: OneDoneWorkActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			requestOneDoneWork,
			successOneDoneWork,
			failureOneDoneWork,
			changeRequestDoneWorkId,
		},
	});
