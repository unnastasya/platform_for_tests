"use client";

import { useCallback, useEffect, useState } from "react";

import { changeOneDoneWork } from "@/api/doneWorks";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
	oneDoneWorksLessonSelector,
} from "@/redux/DoneWork/OneDoneWork";
import { activeUserSelector } from "@/redux/Auth";
import { CheckLesson } from "@/components/CheckLesson/CheckLesson";

interface CheckLessonProps {
	params: {
		doneWorkId: string;
	};
}

export default function CheckLessonPage({ params }: CheckLessonProps) {
	const dispatch = useAppDispatch();

	const { doneWorkId } = params;
	const lesson = useAppSelector(oneDoneWorksLessonSelector);
	const [comment, setComment] = useState<string>("");
	const [ratingValue, setRaitingValue] = useState<number>(0);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const doneWork = useAppSelector(oneDoneWorkDataSelector);
	const isLoadingDoneWork = useAppSelector(oneDoneWorkIsLoadingSelector);

	const [successCriterias, setSuccessCriterias] = useState<any[]>([]);

	const activeUser = useAppSelector(activeUserSelector);

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

	const handleClick = () => {
		changeOneDoneWork(doneWork._id, {
			isVerified: true,
			rating: ratingValue,
			comment: comment,
			successCriterias: successCriterias,
		});
		setIsDialogOpen(true);
		// router.push(`/resultLesson/${doneWorkId}`);
	};

	return (
		<Page>
			<CheckLesson
				activeUser={activeUser}
				isLoading={isLoadingDoneWork}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				doneWorkId={doneWorkId}
				ratingValue={ratingValue}
				lesson={lesson}
				doneWork={doneWork}
				setRaitingValue={setRaitingValue}
				setSuccessCriterias={setSuccessCriterias}
				comment={comment}
				setComment={setComment}
				handleClick={handleClick}
			/>
		</Page>
	);
}
