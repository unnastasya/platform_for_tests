import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Classes/sagas";
import { watchGetOneClassSaga } from "./OneClass/sagas";
import { watchPostOneClassSaga } from "./AddClass/sagas";

export function* rootSaga() {
	yield fork(watchGetClassesSaga);
	yield fork(watchGetOneClassSaga);
	yield fork(watchPostOneClassSaga);
}
