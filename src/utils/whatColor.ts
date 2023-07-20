export const whatColor = (value: number, allCriteriaRating: number) => {
	console.log(value, allCriteriaRating);
	if ((value / allCriteriaRating) * 100 < 20) return "red";
	else if ((value / allCriteriaRating) * 100 < 60) return "yellow";
	else return "green";
};
