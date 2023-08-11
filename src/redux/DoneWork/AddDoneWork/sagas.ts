import { takeLatest, call, put, select } from "redux-saga/effects";
import { addDoneWorkRequestDataSelector } from "./selectors";
import { addDoneWork } from "@/api/doneWorks";
import { AddDoneWorkActions } from "./slice";

function* postDoneWork() {
	try {
		const requestData: {} = yield select(addDoneWorkRequestDataSelector);

		const doneWorkId: { id: string } = yield call(addDoneWork, requestData);
        console.log(doneWorkId)
		yield put(
			AddDoneWorkActions.successAddDoneWork({
				message: "Работа успешно добавлена",
				doneWorkId: doneWorkId.id,
			})
		);
	} catch (e: any) {
		yield put(AddDoneWorkActions.failureAddDoneWork());
	}
}

export function* watchPostDoneWorkSaga() {
	yield takeLatest(AddDoneWorkActions.addDoneWork.type, postDoneWork);
}
