export const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 20) return "red";
	else if (percentage < 60) return "yellow";
	else return "green";
};
