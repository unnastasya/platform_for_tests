import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
	login: Yup.string().required("Пожалуйста, введите логин"),
	password: Yup.string().required("Пожалуйста, введите пароль"),
});
