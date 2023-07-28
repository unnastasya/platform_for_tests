"use client";

import {
	Alert,
	CircularProgress,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
	oneDoneWorksLessonSelector,
} from "@/redux/DoneWork/OneDoneWork";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";

import styles from "./page.module.css";

interface reviewDoneWorkProps {
	params: {
		doneWorkId: string;
	};
}

export default function reviewDoneWork({ params }: reviewDoneWorkProps) {
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

	if (isLoadingDoneWork) {
		return (
			<Page>
				<div className={styles.oneTest__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	console.log(doneWork);
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

				<Alert severity="warning">Ожидает проверки</Alert>
			</Paper>
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
