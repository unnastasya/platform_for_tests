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
		console.log(requestData);
		const data: UserType | { response: { data: { message: string } } } =
			yield call(login, requestData);
		console.log("data", data);

		if (!("userId" in data)) {
			yield put(AuthActions.failureLogin(data.response.data.message));
		} else {
			yield put(AuthActions.successLogin(data));
		}
	} catch (e: any) {
		console.log(e);
		yield put(AuthActions.failureLogin("Не удалось авторизоваться"));
	}
}

export function* watchLoginSaga() {
	yield takeLatest(AuthActions.requestLogin.type, loginSaga);
}
