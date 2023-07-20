export const allCriteriaValue = (questions: any) => {
	let allCriteriaValue = 0;
	for (let i = 0; i < questions.length; i++) {
		let oneQuestionCriteriaSum = 0;
		for (let j = 0; j < questions[i].criteria.length; j++) {
			oneQuestionCriteriaSum =
				oneQuestionCriteriaSum +
				+(Number.isNaN(questions[i].criteria[j].value)
					? 0
					: questions[i].criteria[j].value);
		}
		questions[i].criteriaRating = oneQuestionCriteriaSum;
		allCriteriaValue = allCriteriaValue + oneQuestionCriteriaSum;
	}
	return allCriteriaValue;
};
