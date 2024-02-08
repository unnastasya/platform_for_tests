"use client";
import { useCallback, useEffect } from "react";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
	oneDoneWorksLessonSelector,
} from "@/redux/DoneWork/OneDoneWork";

import { ResultLesson } from "@/components/ResultLesson/ResultLesson";

interface ResultLessonProps {
	params: {
		doneWorkId: string;
	};
}

export default function ResultLessonPage({ params }: ResultLessonProps) {
	const dispatch = useAppDispatch();

	const { doneWorkId } = params;

	const lesson = useAppSelector(oneDoneWorksLessonSelector);

	const doneWork = useAppSelector(oneDoneWorkDataSelector);
	const isLoadingDoneWork = useAppSelector(oneDoneWorkIsLoadingSelector);

	const successCriterias = doneWork.successCriterias;

	const changeDoneWorkId = () => {
		dispatch(OneDoneWorkActions.changeRequestDoneWorkId(doneWorkId));
	};

	const fetchOneDoneWork = useCallback(() => {
		dispatch(OneDoneWorkActions.requestOneDoneWork());
	}, [dispatch]);

	useEffect(() => {
		changeDoneWorkId();
		fetchOneDoneWork();
	}, [dispatch, fetchOneDoneWork, doneWorkId]);

	return (
		<Page>
			<ResultLesson
				isLoading={isLoadingDoneWork}
				doneWork={doneWork}
				lesson={lesson}
				successCriterias={successCriterias}
			/>
		</Page>
	);
}
