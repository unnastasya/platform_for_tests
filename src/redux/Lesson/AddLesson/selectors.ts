import { ApplicationState } from "../../store";

export const addLessonSelector = (state: ApplicationState) => state.addLesson;

export const addLessonRequestDataSelector = (state: ApplicationState) =>
	addLessonSelector(state).requestData;
export const addLessonMessageSelector = (state: ApplicationState) =>
	addLessonSelector(state).message;
export const addLessonIsAddedSelector = (state: ApplicationState) =>
	addLessonSelector(state).lessonIsAdded;
export const addLessonIsLoadingSelector = (state: ApplicationState) =>
	addLessonSelector(state).isLoading;
export const addLessonIdSelector = (state: ApplicationState) =>
	addLessonSelector(state).lessonId;
