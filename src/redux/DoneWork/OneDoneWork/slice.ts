import { DoneWorkType } from "@/types/doneWork";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OneDoneWorkStateType = {
	requestDoneWorkId: string;
	oneDoneWork: DoneWorkType;
	oneDoneWorkIsLoading: boolean;
	oneDoneWorkIsError: boolean;
};

const initialState: OneDoneWorkStateType = {
	requestDoneWorkId: "",
	oneDoneWork: {
		_id: "",
		lessonId: "",
		answers: [],
		isVerified: false,
		school: "",
		class: "",
		student: {},
		allCriteriaRating: 0,
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
	PayloadAction<DoneWorkType>
> = (state, { payload }) => {
	state.oneDoneWorkIsLoading = false;
	state.oneDoneWorkIsError = false;
	state.oneDoneWork = payload;
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
            changeRequestDoneWorkId
		},
	});
