import { takeLatest, call, put, select } from "redux-saga/effects";
import { addDoneWorkRequestDataSelector } from "./selectors";
import { addDoneWork, getDoneWorks } from "@/api/doneWorks";
import { AddDoneWorkActions } from "./slice";
import { activeUserIdSelector } from "@/redux/Auth";
import { DoneWorkType } from "@/types/doneWork";
import { DoneWorksActions } from "../DoneWorks";

function* postDoneWork() {
	try {
		const requestData: {} = yield select(addDoneWorkRequestDataSelector);

		const doneWorkId: { id: string } = yield call(addDoneWork, requestData);
		const userId: string = yield select(activeUserIdSelector);

		yield put(
			AddDoneWorkActions.successAddDoneWork({
				message: "Работа успешно добавлена",
				doneWorkId: doneWorkId.id,
			})
		);

		const doneWorks: DoneWorkType[] = yield call(getDoneWorks, userId);
		yield put(DoneWorksActions.successDoneWorks(doneWorks));
	} catch (e: any) {
		yield put(AddDoneWorkActions.failureAddDoneWork());
	}
}

export function* watchPostDoneWorkSaga() {
	yield takeLatest(AddDoneWorkActions.addDoneWork.type, postDoneWork);
}
