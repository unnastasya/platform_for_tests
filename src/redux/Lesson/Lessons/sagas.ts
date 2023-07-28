import { takeLatest, call, put, select } from "redux-saga/effects";
import { LessonType } from "@/types/lesson";
import { LessonsActions } from "./slice";
import { getLessons, getOneStudentLessons } from "@/api/lessons";
import { activeUserIdSelector } from "@/redux/Auth";

function* getLessonsSaga() {
	try {
		const lessons: LessonType[] = yield call(getLessons);

		yield put(LessonsActions.successLessons(lessons));
	} catch (e: any) {
		yield put(LessonsActions.failureLessons());
	}
}

function* getActiveUsersLessonsSaga() {
	try {
		const userId: string = yield select(activeUserIdSelector);

		const lessons: LessonType[] = yield call(getOneStudentLessons, userId);

		yield put(LessonsActions.successLessons(lessons));
	} catch (e: any) {
		yield put(LessonsActions.failureLessons());
	}
}

export function* watchGetLessonsSaga() {
	yield takeLatest(LessonsActions.requestLessons.type, getLessonsSaga);
}

export function* watchGetActiveUsersLessonsSaga() {
	yield takeLatest(
		LessonsActions.requestActiveUsersOpenLessons.type,
		getActiveUsersLessonsSaga
	);
}
