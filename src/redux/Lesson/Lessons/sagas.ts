import { takeLatest, call, put } from "redux-saga/effects";
import { LessonType } from "@/types/lesson";
import { LessonsActions } from "./slice";
import { getLessons } from "@/api/lessons";

function* getLessonsSaga() {
	try {
		const lessons: LessonType[] = yield call(getLessons);

		yield put(LessonsActions.successLessons(lessons));
	} catch (e: any) {
		yield put(LessonsActions.failureLessons());
	}
}

export function* watchGetLessonsSaga() {
	yield takeLatest(LessonsActions.requestLessons.type, getLessonsSaga);
}
