import { ClassType } from "./class";

export type LessonType = {
	_id: string;
	name: string;
	school: string;
	class: string;
	doneCount: number;
	description: string;
	questions: QuestionType[];
	allCriteriaRating: number;
	classes: ClassType[];
};

export type QuestionType = {
	_id: string;
	question: string;
	criteria: CriteriaType[];
	criteriaRating: number;
};

export type CriteriaType = {
	_id: string;
	text: string;
	value: number;
};
