import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Class/Classes/sagas";
import { watchGetOneClassSaga } from "./Class/OneClass/sagas";
import { watchPostOneClassSaga } from "./Class/AddClass/sagas";
import { watchGetDoneWorksSaga } from "./DoneWork/DoneWorks/sagas";
import { watchGetOneDoneWorksSaga } from "./DoneWork/OneDoneWork/sagas";
import { watchPostDoneWorkSaga } from "./DoneWork/AddDoneWork/sagas";

export function* rootSaga() {
	yield fork(watchGetClassesSaga);
	yield fork(watchGetOneClassSaga);
	yield fork(watchPostOneClassSaga);
	yield fork(watchGetDoneWorksSaga);
	yield fork(watchGetOneDoneWorksSaga);
	yield fork(watchPostDoneWorkSaga);
}
