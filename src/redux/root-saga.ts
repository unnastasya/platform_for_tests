import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Classes/sagas";
import { watchGetOneClassSaga } from "./OneClass/sagas";

export function* rootSaga() {
	yield fork(watchGetClassesSaga);
	yield fork(watchGetOneClassSaga);
}
