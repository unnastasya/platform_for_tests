import * as Yup from "yup";

export const LogiSchema = Yup.object().shape({
	login: Yup.string().required("Пожалуйста, введите логин"),
	password: Yup.string().required("Пожалуйста, введите пароль"),
});
