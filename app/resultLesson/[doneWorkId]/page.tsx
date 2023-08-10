"use client";
import { useCallback, useEffect } from "react";
import {
	Alert,
	CircularProgress,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
	oneDoneWorksLessonSelector,
} from "@/redux/DoneWork/OneDoneWork";

import styles from "./page.module.css";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 20) return styles.rating__question__red;
	else if (percentage < 60) return styles.rating__question__yellow;
	else return styles.rating__question__green;
};

interface ResultLessonProps {
	params: {
		doneWorkId: string;
	};
}

export default function ResultLesson({ params }: ResultLessonProps) {
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
	}, [dispatch, fetchOneDoneWork, doneWorkId]);

	if (isLoadingDoneWork) {
		return (
			<Page>
				<div className={styles.resultLesson__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<Paper className={styles.resultLesson__container}>
				{doneWork.rating && (
					<p
						className={`${styles.rating__question} ${whatColor(
							doneWork.rating,
							lesson.allCriteriaRating
						)}`}
					>
						{doneWork.rating}
					</p>
				)}

				<p className={styles.resultLesson__header}>{lesson.name}</p>
				<p>
					{doneWork.student.name} {doneWork.student.surname}
				</p>

				<p>
					{doneWork.school}, {doneWork.class}
				</p>
				<Alert severity="success">Проверено</Alert>
			</Paper>
			{doneWork.comment && (
				<Paper className={styles.resultLesson__container}>
					<p className={styles.resultLesson__header}>
						Комментарий к работе:
					</p>
					<p>{doneWork.comment}</p>
				</Paper>
			)}
			{lesson.questions &&
				lesson.questions.map((question: any, index: any) => (
					<QuestionBlock
						index={index}
						key={question._id}
						question={question}
					>
						<FormControl fullWidth>
							<TextField
								multiline
								label="Ответ ученика"
								value={doneWork.answers[index]}
							/>
						</FormControl>
						<Divider />
						<QuestionCriteria question={question} />
					</QuestionBlock>
				))}
		</Page>
	);
}
