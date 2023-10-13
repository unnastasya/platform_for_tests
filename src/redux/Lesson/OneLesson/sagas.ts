import { takeLatest, call, put, select } from "redux-saga/effects";
import { oneLessonRequestIdSelector } from "./selectors";
import { LessonType } from "@/types/lesson";
import { changeVisible, getOneLesson } from "@/api/lessons";
import { OneLessonActions } from "./slice";

function* getOneLessonSaga() {
	try {
		const lessonId: string = yield select(oneLessonRequestIdSelector);

		const lesson: LessonType = yield call(getOneLesson, lessonId);
		yield put(OneLessonActions.successOneLesson(lesson));
	} catch (e: any) {
		yield put(OneLessonActions.failureOneLesson());
	}
}

function* changeVisibleLessonSaga() {
	try {
		const lessonId: string = yield select(oneLessonRequestIdSelector);

		yield call(changeVisible, lessonId);

		const lesson: LessonType = yield call(getOneLesson, lessonId);

		yield put(OneLessonActions.successOneLesson(lesson));
	} catch (e: any) {
		yield put(OneLessonActions.failureOneLesson());
	}
}

export function* watchGetOneLessonSaga() {
	yield takeLatest(OneLessonActions.requestOneLesson.type, getOneLessonSaga);
}

export function* watchChangeVisibleLessonSaga() {
	yield takeLatest(
		OneLessonActions.changeVisibleLesson.type,
		changeVisibleLessonSaga
	);
}
