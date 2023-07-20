"use client";
import { useEffect, useState } from "react";

import styles from "./page.module.css";
import { getOneDoneWork } from "@/api/doneWorks";
import { getOneLesson } from "@/api/lessons";
import { Alert, Divider, FormControl, Paper, TextField } from "@mui/material";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";
import { Page } from "@/components/Page/Page";

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
	const { doneWorkId } = params;
	const [lesson, setLesson] = useState<any>({});
	const [doneWork, setDoneWork] = useState<any>({});

	useEffect(() => {
		const fetchData = async () => {
			const oneDoneWorkData = await getOneDoneWork(doneWorkId);
			const lessonData = await getOneLesson(
				oneDoneWorkData.lessonId
			).then((res: any) => res);

			setDoneWork(oneDoneWorkData);
			setLesson(lessonData);
		};
		// getOneDoneWork(id).then((res) => setLesson(res));
		fetchData();
	}, [doneWorkId]);

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
				<p>{doneWork.studentName}</p>
				<p>{lesson.school}</p>
				<p>{lesson.class}</p>
				<Alert severity="success">
					Проверено
				</Alert>
			</Paper>
			{doneWork.comment && (
				<Paper className={styles.resultLesson__container}>
					<p className={styles.resultLesson__header}>Комментарий к работе:</p>
					<p>{doneWork.comment}</p>
				</Paper>
			)}
			{lesson.questions &&
				lesson.questions.map((question: any, index: any) => (
					<QuestionBlock
						index={index}
						key={question.id}
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
