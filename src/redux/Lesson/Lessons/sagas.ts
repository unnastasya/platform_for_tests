import { takeLatest, call, put, select } from "redux-saga/effects";
import { LessonType } from "@/types/lesson";
import { LessonsActions } from "./slice";
import { deleteLesson, getLessons, getOneStudentLessons } from "@/api/lessons";
import { activeUserIdSelector } from "@/redux/Auth";
import { deleteLessonRequestIdSelector } from "./selectors";

function* getLessonsSaga() {
	try {
		const activeUserId: string = yield select(activeUserIdSelector);

		const lessons: LessonType[] = yield call(getLessons, activeUserId);

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

function* deleteLessonSaga() {
	try {
		const lessonId: string = yield select(deleteLessonRequestIdSelector);

		yield call(deleteLesson, lessonId);

		const activeUserId: string = yield select(activeUserIdSelector);

		const lessons: LessonType[] = yield call(getLessons, activeUserId);
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

export function* watchDeleteLessonSaga() {
	yield takeLatest(LessonsActions.deleteLesson.type, deleteLessonSaga);
}
