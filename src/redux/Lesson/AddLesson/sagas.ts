import { takeLatest, call, put, select } from "redux-saga/effects";
import {
	addLessonRequestDataSelector,
	editLessonIdDataSelector,
} from "./selectors";
import { addLesson, getLessons, updateLesson } from "@/api/lessons";
import { AddLessonActions } from "./slice";
import { activeUserIdSelector } from "@/redux/Auth";
import { LessonType } from "@/types/lesson";
import { LessonsActions } from "../Lessons";

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

		const activeUserId: string = yield select(activeUserIdSelector);

		const lessons: LessonType[] = yield call(getLessons, activeUserId);

		yield put(LessonsActions.successLessons(lessons));
	} catch (e: any) {
		yield put(AddLessonActions.failureAddLesson());
	}
}

function* editLessonSaga() {
	try {
		const requestData: {} = yield select(addLessonRequestDataSelector);
		const editLessonId: string = yield select(editLessonIdDataSelector);

		const lessonId: string = yield call(updateLesson, {
			id: editLessonId,
			data: requestData,
		});

		yield put(
			AddLessonActions.successAddLesson({
				message: "Работа успешно добавлена",
				lessonId: lessonId,
			})
		);

		const activeUserId: string = yield select(activeUserIdSelector);

		const lessons: LessonType[] = yield call(getLessons, activeUserId);

		yield put(LessonsActions.successLessons(lessons));
	} catch (e: any) {
		yield put(AddLessonActions.failureAddLesson());
	}
}

export function* watchPostLessonSaga() {
	yield takeLatest(AddLessonActions.addLesson.type, postLessonSaga);
}

export function* watchEditLessonSaga() {
	yield takeLatest(AddLessonActions.editLesson.type, editLessonSaga);
}
