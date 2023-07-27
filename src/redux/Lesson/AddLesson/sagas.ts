import { takeLatest, call, put, select } from "redux-saga/effects";
import { addLessonRequestDataSelector } from "./selectors";
import { addLesson } from "@/api/lessons";
import { AddLessonActions } from "./slice";

function* postLessonSaga() {
	try {
		const requestData: {} = yield select(addLessonRequestDataSelector);

		const lessonId: string = yield call(addLesson, requestData);

		yield put(
			AddLessonActions.successAddLesson({
				message: "Работа успешно добавлена",
				lessonId: lessonId,
			})
		);
	} catch (e: any) {
		yield put(AddLessonActions.failureAddLesson());
	}
}

export function* watchPostLessonSaga() {
	yield takeLatest(AddLessonActions.addLesson.type, postLessonSaga);
}
