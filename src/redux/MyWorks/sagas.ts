import { takeLatest, call, put, select } from "redux-saga/effects";
import { getOneStudentWorks } from "@/api/doneWorks";
import { MyWorksActions } from "./slice";
import { activeUserIdSelector } from "../Auth";
import { DoneWorkType } from "@/types/doneWork";

function* getMyWorksSaga() {
	try {
		const activeUserId: string = yield select(activeUserIdSelector);

		const myWorks: DoneWorkType[] = yield call(
			getOneStudentWorks,
			activeUserId
		);
		yield put(MyWorksActions.successMyWorks(myWorks));
	} catch (e: any) {
		yield put(MyWorksActions.failureMyWorks());
	}
}

export function* watchGetMyWorksSaga() {
	yield takeLatest(MyWorksActions.requestMyWorks.type, getMyWorksSaga);
}
