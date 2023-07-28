import { ApplicationState } from "../../store";

export const lessonsSelector = (state: ApplicationState) => state.lessons;

export const lessonsDataSelector = (state: ApplicationState) =>
	lessonsSelector(state).lessons;
export const lessonsIsLoadingSelector = (state: ApplicationState) =>
	lessonsSelector(state).lessonsIsLoading;
export const lessonsHasErrorSelector = (state: ApplicationState) =>
	lessonsSelector(state).lessonsHasError;
export const deleteLessonRequestIdSelector = (state: ApplicationState) =>
	lessonsSelector(state).deleteLessonRequestId;
