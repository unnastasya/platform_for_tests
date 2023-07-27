import { takeLatest, call, put } from "redux-saga/effects";
import { DoneWorksActions } from "./slice";
import { DoneWorkType } from "@/types/doneWork";
import { getDoneWorks } from "@/api/doneWorks";

function* getDoneWorksSaga() {
	try {
		const doneWorks: DoneWorkType[] = yield call(getDoneWorks);
		yield put(DoneWorksActions.successDoneWorks(doneWorks));
	} catch (e: any) {
		yield put(DoneWorksActions.failureDoneWorks());
	}
}

export function* watchGetDoneWorksSaga() {
	yield takeLatest(DoneWorksActions.requestDoneWorks.type, getDoneWorksSaga);
}
