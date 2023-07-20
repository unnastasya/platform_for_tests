export type DoneWorkType = {
	_id: string;
	lessonId: string;
	answers: string[];
	isVerified: boolean;
	school: string;
	class: string;
	rating?: number;
	comment?: string;
	student: string;
    allCriteriaRating: number;
};
