"use client";

import { getOneLesson } from "@/api/lessons";
import { Alert, CircularProgress, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Page } from "@/components/Page/Page";
import CheckBlock from "@/components/CheckBlock/CheckBlock";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
} from "@/redux/DoneWork/OneDoneWork";

import styles from "./page.module.css";

interface reviewDoneWorkProps {
	params: {
		doneWorkId: string;
	};
}

export default function reviewDoneWork({ params }: reviewDoneWorkProps) {
	const dispatch = useAppDispatch();

	const { doneWorkId } = params;
	const [lesson, setLesson] = useState<any>({});
	const [ratingValue, setRaitingValue] = useState<number>(0);

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
	}, [dispatch, fetchOneDoneWork, doneWorkId]);

	useEffect(() => {
		const fetchData = async () => {
			const lessonData = await getOneLesson(doneWork.lessonId);

			setLesson(lessonData);
		};

		fetchData();
	}, [doneWorkId]);

	if (isLoadingDoneWork) {
		return (
			<Page>
				<div className={styles.oneTest__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<Paper className={styles.oneTest__questionBlock}>
				<p className={styles.oneTest__headerText}>{lesson.name}</p>
				<p className={styles.oneTest__headerText}>
					{doneWork.student.name} {doneWork.student.surname}
				</p>
				<p>
					{doneWork.school}, {doneWork.class}
				</p>
				{doneWork.isVerified ? (
					<Alert>Проверено</Alert>
				) : (
					<Alert severity="warning">Ожидает проверки</Alert>
				)}
			</Paper>
			{lesson.questions &&
				lesson.questions.map((question: any, index: any) => (
					<CheckBlock
						setRaitingValue={setRaitingValue}
						key={question._id}
						question={question}
						answer={doneWork.answers[index]}
					/>
				))}
		</Page>
	);
}
