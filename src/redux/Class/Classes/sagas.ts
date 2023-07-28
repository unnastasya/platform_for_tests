import { deleteOneClass, getAllClasses } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import { ClassesActions } from "./slice";
import { deleteClassRequestIdSelector } from "./selectors";

function* getClassesSaga() {
	try {
		const classes: ClassType[] = yield call(getAllClasses);
		yield put(ClassesActions.successClasses(classes));
	} catch (e: any) {
		yield put(ClassesActions.failureClasses());
	}
}

function* deleteClassSaga() {
	try {
		const classId: string = yield select(deleteClassRequestIdSelector);

		yield call(deleteOneClass, classId);

		const classes: ClassType[] = yield call(getAllClasses);
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
