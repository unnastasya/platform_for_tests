import { LessonType } from "./lesson";

export type DoneWorkType = {
	_id: string;
	lessonId: LessonType;
	answers: string[];
	isVerified: boolean;
	school: string;
	class: string;
	rating?: number;
	comment?: string;
	student: any;
	allCriteriaRating: number;
};
