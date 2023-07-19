import { LessonType } from "./lesson";

export type ClassType = {
	_id: number;
	school: string;
	class: string;
	studentsCount: number;
	lessons: LessonType[];
};
