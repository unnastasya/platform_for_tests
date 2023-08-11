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

		const data: UserType | { errorMessage: string } = yield call(
			login,
			requestData
		);

		if ("errorMessage" in data) {
			yield put(AuthActions.failureLogin(data.errorMessage));
		} else {
			yield put(AuthActions.successLogin(data));
		}
	} catch (e: any) {
		yield put(AuthActions.failureLogin("Не удалось авторизоваться"));
	}
}

export function* watchLoginSaga() {
	yield takeLatest(AuthActions.requestLogin.type, loginSaga);
}
