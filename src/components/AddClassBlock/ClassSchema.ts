import * as Yup from "yup";

export const ClassSchema = Yup.object().shape({
	school: Yup.string().required("Введите школу"),
	class: Yup.string().required("Введите класс"),
	people: Yup.array()
		.of(
			Yup.object({
				name: Yup.string().required("Введите имя"),
				surname: Yup.string().required("Введите фамилия"),
			})
		)
		.min(1, "Добавьте хотя бы одного ученика"),
	authorId: Yup.string().required(),
});
