import { takeLatest, call, put, select } from "redux-saga/effects";
import { getDoneWorks } from "@/api/doneWorks";
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
