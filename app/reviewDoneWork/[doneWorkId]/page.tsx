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

import { ReviewDoneWork } from "@/components/ReviewDoneWork/ReviewDoneWork";

interface ReviewDoneWorkProps {
	params: {
		doneWorkId: string;
	};
}

export default function ReviewDoneWorkPage({ params }: ReviewDoneWorkProps) {
	const dispatch = useAppDispatch();

	const { doneWorkId } = params;

	const lesson = useAppSelector(oneDoneWorksLessonSelector);
	const doneWork = useAppSelector(oneDoneWorkDataSelector);
	const isLoadingDoneWork = useAppSelector(oneDoneWorkIsLoadingSelector);

	const changeDoneWorkId = () => {
		dispatch(OneDoneWorkActions.changeRequestDoneWorkId(doneWorkId));
	};

	const fetchOneDoneWork = useCallback(() => {
		dispatch(OneDoneWorkActions.requestOneDoneWork());
	}, [dispatch]);

	useEffect(() => {
		changeDoneWorkId();
		fetchOneDoneWork();
	}, [doneWorkId]);

	return (
		<Page>
			<ReviewDoneWork
				isLoading={isLoadingDoneWork}
				lesson={lesson}
				doneWork={doneWork}
			/>
		</Page>
	);
}
