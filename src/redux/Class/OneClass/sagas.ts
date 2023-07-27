import { getOneClass } from "@/api/classes";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { ClassType } from "@/types/class";
import { OneClassActions } from "./slice";
import { requestClassIdSelector } from "./selectors";
import { User } from "@/types/user";
import { getUsersByClassId } from "@/api/auth";

function* getOneClasses() {
	try {
		const classId: string = yield select(requestClassIdSelector);

		const oneClass: ClassType = yield call(getOneClass, classId);
		const classStudents: User[] = yield call(getUsersByClassId, classId);
		yield put(
			OneClassActions.successOneClass({
				oneClass: oneClass,
				classStudents: classStudents,
			})
		);
	} catch (e: any) {
		yield put(OneClassActions.failureOneClass());
	}
}

export function* watchGetOneClassSaga() {
	yield takeLatest(OneClassActions.requestOneClass.type, getOneClasses);
}
