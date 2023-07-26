import { fork } from "redux-saga/effects";
import { watchGetClassesSaga } from "./Class/sagas";

export function* rootSaga() {
    yield fork(watchGetClassesSaga);
}
