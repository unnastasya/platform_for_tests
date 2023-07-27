import { ApplicationState } from "../../store";

export const oneLessonSelector = (state: ApplicationState) => state.oneLesson;

export const oneLessonDataSelector = (state: ApplicationState) =>
	oneLessonSelector(state).oneLesson;
export const oneLessonIsLoadingSelector = (state: ApplicationState) =>
	oneLessonSelector(state).oneLessonIsLoading;
export const oneLessonHasErrorSelector = (state: ApplicationState) =>
	oneLessonSelector(state).oneLessonHasError;
export const oneLessonRequestIdSelector = (state: ApplicationState) =>
	oneLessonSelector(state).requestLessonId;
