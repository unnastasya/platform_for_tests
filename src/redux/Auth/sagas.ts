import { LoginUserType, UserType } from "@/types/user";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { requestLoginUserDataSelector } from "./selectors";
import { AuthActions } from "./slice";
import { login } from "@/api/auth";

function* loginSaga() {
	try {
		const requestData: LoginUserType = yield select(
			requestLoginUserDataSelector
		);
		const data: UserType = yield call(login, requestData);
		
		yield put(AuthActions.successLogin(data));
		// yield put(AuthActions.successUser(data));
	} catch (e: any) {
		yield put(AuthActions.failureLogin(e.message));
	}
}

export function* watchLoginSaga() {
	yield takeLatest(AuthActions.requestLogin.type, loginSaga);
}
