import { LessonType } from "./lesson";
import { User, UserType } from "./user";

export type ClassType = {
	_id: number;
	school: string;
	class: string;
	studentsCount: number;
	students?: User[];
	lessons: LessonType[];
    authorId: string;
};
