export const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 50) return "red";
	else if (percentage < 80) return "yellow";
	else return "green";
};
