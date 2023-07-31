import { addClass, getAllClasses, updateClass } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import {
	addClassRequestDataSelector,
	editClassIdDataSelector,
} from "./selectors";
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

function* editOneClassSaga() {
	try {
		const requestData: {} = yield select(addClassRequestDataSelector);
		const editClassId: string = yield select(editClassIdDataSelector);

		console.log("requestData", requestData);

		const usersData: AddUserType[] = yield call(updateClass, {
			id: editClassId,
			data: requestData,
		});

		yield put(
			AddClassActions.successAddClass({
				message: "Класс успешно обновлен",
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

export function* watchEditOneClassSaga() {
	yield takeLatest(AddClassActions.editClass.type, editOneClassSaga);
}
