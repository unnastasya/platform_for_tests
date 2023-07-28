import { takeLatest, call, put, select } from "redux-saga/effects";
import { DoneWorkType } from "@/types/doneWork";
import { getOneDoneWork } from "@/api/doneWorks";
import { oneDoneWorkRequestIdSelector } from "./selectors";
import { OneDoneWorkActions } from "./slice";

function* getOneDoneWorkSaga() {
	try {
		const workId: string = yield select(oneDoneWorkRequestIdSelector);

		const doneWork: DoneWorkType = yield call(getOneDoneWork, workId);
		yield put(OneDoneWorkActions.successOneDoneWork(doneWork));
	} catch (e: any) {
		yield put(OneDoneWorkActions.failureOneDoneWork());
	}
}

export function* watchGetOneDoneWorksSaga() {
	yield takeLatest(
		OneDoneWorkActions.requestOneDoneWork.type,
		getOneDoneWorkSaga
	);
}
