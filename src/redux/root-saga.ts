import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Class/Classes/sagas";
import { watchGetOneClassSaga } from "./Class/OneClass/sagas";
import { watchPostOneClassSaga } from "./Class/AddClass/sagas";
import { watchGetDoneWorksSaga } from "./DoneWork/DoneWorks/sagas";
import { watchGetOneDoneWorksSaga } from "./DoneWork/OneDoneWork/sagas";
import { watchPostDoneWorkSaga } from "./DoneWork/AddDoneWork/sagas";
import { watchLoginSaga } from "./Auth/sagas";
import { watchGetLessonsSaga } from "./Lesson/Lessons/sagas";
import { watchGetOneLessonSaga } from "./Lesson/OneLesson/sagas";
import { watchPostLessonSaga } from "./Lesson/AddLesson/sagas";

export function* rootSaga() {
	yield fork(watchGetClassesSaga);
	yield fork(watchGetOneClassSaga);
	yield fork(watchPostOneClassSaga);
	yield fork(watchGetDoneWorksSaga);
	yield fork(watchGetOneDoneWorksSaga);
	yield fork(watchPostDoneWorkSaga);
	yield fork(watchLoginSaga);
	yield fork(watchGetLessonsSaga);
	yield fork(watchGetOneLessonSaga);
    yield fork (watchPostLessonSaga)
}
