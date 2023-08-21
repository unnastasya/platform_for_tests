import { takeLatest, call, put, select } from "redux-saga/effects";
import { DoneWorksActions } from "./slice";
import { DoneWorkType } from "@/types/doneWork";
import { getDoneWorks, getOneStudentWorks } from "@/api/doneWorks";
import { activeUserIdSelector } from "@/redux/Auth";
import { requestUserIdSelector } from "./selectors";
import { UserType } from "@/types/user";
import { getOneUser } from "@/api/auth";

function* getDoneWorksSaga() {
	try {
		const userId: string = yield select(activeUserIdSelector);

		const doneWorks: DoneWorkType[] = yield call(getDoneWorks, userId);
		yield put(DoneWorksActions.successDoneWorks(doneWorks));
	} catch (e: any) {
		yield put(DoneWorksActions.failureDoneWorks());
	}
}

function* getActiveUsersDoneWorksSaga() {
	try {
		const userId: string = yield select(activeUserIdSelector);

		const doneWorks: DoneWorkType[] = yield call(
			getOneStudentWorks,
			userId
		);
		yield put(DoneWorksActions.successDoneWorks(doneWorks));
	} catch (e: any) {
		yield put(DoneWorksActions.failureDoneWorks());
	}
}

function* getOneUsersDoneWorksSaga() {
	try {
		const userId: string = yield select(requestUserIdSelector);

		const doneWorks: DoneWorkType[] = yield call(
			getOneStudentWorks,
			userId
		);

		const user: UserType = yield call(getOneUser, userId);
		yield put(
			DoneWorksActions.successOneUsersDoneWorks({
				works: doneWorks,
				user: user,
			})
		);
	} catch (e: any) {
		yield put(DoneWorksActions.failureDoneWorks());
	}
}

export function* watchGetDoneWorksSaga() {
	yield takeLatest(DoneWorksActions.requestDoneWorks.type, getDoneWorksSaga);
}

export function* watchGetActiveUsersDoneWorksSaga() {
	yield takeLatest(
		DoneWorksActions.requestActiveUsersDoneWorks.type,
		getActiveUsersDoneWorksSaga
	);
}

export function* watchGetOneUsersDoneWorksSaga() {
	yield takeLatest(
		DoneWorksActions.requesOneUsersDoneWorks.type,
		getOneUsersDoneWorksSaga
	);
}
