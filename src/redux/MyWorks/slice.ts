import { DoneWorkType } from "@/types/doneWork";
import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MyWorksStateType = {
	myWorks: DoneWorkType[];
	myWorksIsLoading: boolean;
	myWorksIsError: boolean;
};

const initialState: MyWorksStateType = {
	myWorks: [],
	myWorksIsLoading: false,
	myWorksIsError: false,
};

const NAME = "myWorks";

const requestMyWorks: CaseReducer<MyWorksStateType> = (state) => {
	state.myWorksIsLoading = true;
	state.myWorksIsError = false;
};

const successMyWorks: CaseReducer<
	MyWorksStateType,
	PayloadAction<DoneWorkType[]>
> = (state, { payload }) => {
	state.myWorksIsLoading = false;
	state.myWorksIsError = false;
	state.myWorks = payload;
};

const failureMyWorks: CaseReducer<MyWorksStateType> = (state) => {
	state.myWorksIsLoading = false;
	state.myWorksIsError = true;
};

export const { reducer: MyWorksReducer, actions: MyWorksActions } = createSlice(
	{
		name: NAME,
		initialState,
		reducers: {
			requestMyWorks,
			successMyWorks,
			failureMyWorks,
		},
	}
);
