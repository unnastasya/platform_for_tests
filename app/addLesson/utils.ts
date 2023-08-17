import { addImage } from "@/api/lessons";

export default async function addImagesToQuestions(value: any) {
	for (
		let questionIndex = 0;
		questionIndex < value.questions.length;
		questionIndex++
	) {
		for (
			let imageIndex = 0;
			imageIndex < value.questions[questionIndex].images.length;
			imageIndex++
		) {
			if (
				!(
					"public_id" in
					value.questions[questionIndex].images[imageIndex]
				)
			) {
				const imageData = await addImage(
					value.questions[questionIndex].images[imageIndex]
				).then((res: any) => res);
				value.questions[questionIndex].images[imageIndex] = imageData;
			}
		}
	}
}
