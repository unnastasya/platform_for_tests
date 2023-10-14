import { deleteOneClass, getAllClasses } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import { ClassesActions } from "./slice";
import { deleteClassRequestIdSelector } from "./selectors";
import { activeUserIdSelector } from "@/redux/Auth";

function* getClassesSaga() {
	try {
		const activeUserId: string = yield select(activeUserIdSelector);

		const classes: ClassType[] = yield call(getAllClasses, activeUserId);

		if ("message" in classes) {
			yield put(ClassesActions.failureClasses());
		} else {
			yield put(ClassesActions.successClasses(classes));
		}
	} catch (e: any) {
		yield put(ClassesActions.failureClasses());
	}
}

function* deleteClassSaga() {
	try {
		const classId: string = yield select(deleteClassRequestIdSelector);
		const activeUserId: string = yield select(activeUserIdSelector);

		yield call(deleteOneClass, classId);

		const classes: ClassType[] = yield call(getAllClasses, activeUserId);
		yield put(ClassesActions.successClasses(classes));
	} catch (e: any) {
		yield put(ClassesActions.failureClasses());
	}
}

export function* watchGetClassesSaga() {
	yield takeLatest(ClassesActions.requestClasses.type, getClassesSaga);
}

export function* watchDeleteClassSaga() {
	yield takeLatest(ClassesActions.deleteClass.type, deleteClassSaga);
}
