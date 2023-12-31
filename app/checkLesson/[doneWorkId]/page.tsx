"use client";

import { changeOneDoneWork } from "@/api/doneWorks";
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Page } from "@/components/Page/Page";
import CheckBlock from "@/components/CheckBlock/CheckBlock";
import AddComment from "@/components/AddComment/AddComment";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneDoneWorkActions,
	oneDoneWorkDataSelector,
	oneDoneWorkIsLoadingSelector,
	oneDoneWorksLessonSelector,
} from "@/redux/DoneWork/OneDoneWork";
import { activeUserSelector } from "@/redux/Auth";

import styles from "./page.module.css";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 50) return styles.rating__question__red;
	else if (percentage < 80) return styles.rating__question__yellow;
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

	if (activeUser.role == "student") {
		return (
			<Page>
				<div className={styles.oneTest__loadingContainer}>
					<p>Нет доступа</p>
				</div>
			</Page>
		);
	}

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
			<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
				<DialogContent>
					<DialogContentText>Оценка выставлена</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => {
							setIsDialogOpen(false);
							router.push(`/resultLesson/${doneWorkId}`);
						}}
					>
						ОК
					</Button>
				</DialogActions>
			</Dialog>
			<div className={styles.oneTest__container}>
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
					<p className={styles.oneTest__headerText}>
						{doneWork.student.name} {doneWork.student.surname}
					</p>
					<p>
						{doneWork.student.class?.school},{" "}
						{doneWork.student.class?.class}
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
							successCriterias={successCriterias}
							setSuccessCriterias={setSuccessCriterias}
						/>
					))}
				<AddComment comment={comment} setComment={setComment} />
				<Button
					onClick={handleClick}
					variant="contained"
					endIcon={<DoneIcon />}
				>
					Выставить оценку
				</Button>
			</div>
		</Page>
	);
}
