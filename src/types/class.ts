import { LessonType } from "./lesson";
import { UserType } from "./user";

export type ClassType = {
	_id: number;
	school: string;
	class: string;
	studentsCount: number;
	students?: UserType[];
	lessons: LessonType[];
};
