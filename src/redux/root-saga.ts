import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Classes/sagas";

export function* rootSaga() {
	yield fork(watchGetClassesSaga);
}
