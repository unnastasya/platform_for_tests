import * as Yup from "yup";

export const LessonSchema = Yup.object().shape({
	name: Yup.string().required("Введите урок"),
	classes: Yup.array(),
	doneCount: Yup.number(),
	questions: Yup.array()
		.of(
			Yup.object({
				images: Yup.array(),
				questionText: Yup.string().required("Введите вопрос"),
				criteria: Yup.array()
					.of(
						Yup.object({
							text: Yup.string().required(
								"Установите критерий и количество бвллов больше 1"
							),
							value: Yup.number().min(1).required(),
							status: Yup.boolean(),
						})
					)
					.min(1, "хотя бы 1 критерий"),
				criteriaRating: Yup.number(),
			})
		)
		.min(1, "Пожалуйста, добавьте хотя бы один вопрос"),
	allCriteriaRating: Yup.number(),
	authorId: Yup.string(),
});
