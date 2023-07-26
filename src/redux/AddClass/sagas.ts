import { addClass, getAllClasses } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import { addClassRequestDataSelector } from "./selectors";
import { AddUserType } from "@/types/user";
import { AddClassActions } from "./slice";

function* postOneClass() {
	try {
		const requestData: {} = yield select(addClassRequestDataSelector);

		const usersData: AddUserType[] = yield call(addClass, requestData);

		yield put(
			AddClassActions.successAddClass({
				message: "Класс успешно добавлен",
				usersData: usersData,
			})
		);
	} catch (e: any) {
		yield put(AddClassActions.failureAddClass());
	}
}

export function* watchPostOneClassSaga() {
	yield takeLatest(AddClassActions.addClass.type, postOneClass);
}
