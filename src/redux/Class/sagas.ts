import { getAllClasses } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import { ClassesActions } from "./slice";

function* getClasses() {
	try {
		const classes: ClassType[] = yield call(getAllClasses);
		yield put(ClassesActions.successClasses(classes));
	} catch (e: any) {
		yield put(ClassesActions.failureClasses());
	}
}

export function* watchGetClassesSaga() {
	yield takeLatest(ClassesActions.requestClasses.type, getClasses);
}
