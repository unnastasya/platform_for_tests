import { DoneWorkType } from "@/types/doneWork";
import { UserType } from "@/types/user";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DoneWorksStateType = {
	requestIdData?: string;
	doneWorks: DoneWorkType[];
	doneWorksIsLoading: boolean;
	doneWorksIsError: boolean;

	openUser?: UserType;
};

const initialState: DoneWorksStateType = {
	doneWorks: [],
	doneWorksIsLoading: false,
	doneWorksIsError: false,
};

const NAME = "doneWorks";

const requestDoneWorks: CaseReducer<DoneWorksStateType> = (state) => {
	state.doneWorksIsLoading = true;
	state.doneWorksIsError = false;
};

const successDoneWorks: CaseReducer<
	DoneWorksStateType,
	PayloadAction<DoneWorkType[]>
> = (state, { payload }) => {
	state.doneWorksIsLoading = false;
	state.doneWorksIsError = false;
	state.doneWorks = payload;
};

const failureDoneWorks: CaseReducer<DoneWorksStateType> = (state) => {
	state.doneWorksIsLoading = false;
	state.doneWorksIsError = true;
};

const requestActiveUsersDoneWorks: CaseReducer<DoneWorksStateType> = (
	state
) => {
	state.doneWorksIsLoading = true;
	state.doneWorksIsError = false;
};

const changeRequestIdData: CaseReducer<
	DoneWorksStateType,
	PayloadAction<string>
> = (state, { payload }) => {
	state.requestIdData = payload;
};

const requesOneUsersDoneWorks: CaseReducer<DoneWorksStateType> = (state) => {
	state.doneWorksIsLoading = true;
	state.doneWorksIsError = false;
};

const successOneUsersDoneWorks: CaseReducer<
	DoneWorksStateType,
	PayloadAction<{ works: DoneWorkType[]; user: UserType }>
> = (state, { payload }) => {
	state.doneWorksIsLoading = false;
	state.doneWorksIsError = false;
	state.doneWorks = payload.works;
	state.openUser = payload.user;
};

export const { reducer: DoneWorksReducer, actions: DoneWorksActions } =
	createSlice({
		name: NAME,
		initialState,
		reducers: {
			requestDoneWorks,
			successDoneWorks,
			failureDoneWorks,
			requestActiveUsersDoneWorks,
			changeRequestIdData,
			requesOneUsersDoneWorks,
			successOneUsersDoneWorks,
		},
	});
