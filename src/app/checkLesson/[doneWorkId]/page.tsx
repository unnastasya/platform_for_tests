"use client";

import { changeOneDoneWork } from "@/api/doneWorks";
import { getOneLesson } from "@/api/lessons";
import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Page } from "@/components/Page/Page";
import CheckBlock from "@/components/CheckBlock/CheckBlock";
import AddComent from "@/components/AddComent/AddComent";

import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
} from "@/redux/DoneWork/OneDoneWork";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 20) return styles.rating__question__red;
	else if (percentage < 60) return styles.rating__question__yellow;
	else return styles.rating__question__green;
};

interface CheckLessonProps {
	params: {
		doneWorkId: string;
	};
}

export default function CheckLesson({ params }: CheckLessonProps) {
	const dispatch = useAppDispatch();

	const { doneWorkId } = params;
	const router = useRouter();
	const [lesson, setLesson] = useState<any>({});
	// const [doneWork, setDoneWork] = useState<any>({});
	const [comment, setComment] = useState<string>("");
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
			// const oneDoneWorkData = await getOneDoneWork(doneWorkId);
			const lessonData = await getOneLesson(doneWork.lessonId);

			// setDoneWork(oneDoneWorkData);
			setLesson(lessonData);
		};

		fetchData();
	}, [doneWorkId]);

	const handleClick = () => {
		changeOneDoneWork(doneWork._id, {
			isVerified: true,
			rating: ratingValue,
			comment: comment,
		});
		router.push(`/resultLesson/${doneWorkId}`);
	};

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
			<div
				className={`${styles.countRating__question} ${whatColor(
					ratingValue,
					lesson.allCriteriaRating
				)}`}
			>
				<p>{ratingValue}</p>
			</div>
			<Paper className={styles.oneTest__questionBlock}>
				<p className={styles.oneTest__headerText}>{lesson.name}</p>
				<p className={styles.oneTest__headerText}>{doneWork.student.name} {doneWork.student.surname}</p>
				<p>
					{lesson.school}, {lesson.class}
				</p>

				<Alert severity="warning">Ожидает проверки</Alert>
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
			<AddComent comment={comment} setComment={setComment} />
			<Button
				onClick={handleClick}
				variant="contained"
				endIcon={<DoneIcon />}
			>
				Выставить оценку
			</Button>
		</Page>
	);
}
