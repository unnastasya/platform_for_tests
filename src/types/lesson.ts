import { ClassType } from "./class";

export type LessonType = {
	_id: string;
	name: string;
	description: string;
	doneCount: number;
	allCriteriaRating: number;
	questions: QuestionType[];
	classes: ClassType[];
};

export type QuestionType = {
	_id: string;
	questionText: string;
	description: string;
	criteria: CriteriaType[];
	criteriaRating: number;
};

export type CriteriaType = {
	_id: string;
	text: string;
	value: number;
};
