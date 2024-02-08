import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Divider,
	Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DoneIcon from "@mui/icons-material/Done";

import CheckBlock from "../CheckBlock/CheckBlock";
import AddComment from "../AddComment/AddComment";

import styles from "./CheckLesson.module.css";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 50) return styles.rating__red;
	else if (percentage < 80) return styles.rating__yellow;
	else return styles.rating__green;
};

export const CheckLesson = ({
	activeUser,
	isLoading,
	isDialogOpen,
	setIsDialogOpen,
	doneWorkId,
	ratingValue,
	lesson,
	doneWork,
	setRaitingValue,
	setSuccessCriterias,
	comment,
	setComment,
	handleClick,
}: any) => {
	const router = useRouter();

	if (activeUser.role == "student") {
		return (
			<div className={styles.centered__container}>
				<p>Нет доступа</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className={styles.centered__container}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
				<DialogContent sx={{ padding: "30px" }}>
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
			<div className={styles.container}>
				<div
					className={`${styles.countRating} ${whatColor(
						ratingValue,
						lesson.allCriteriaRating
					)}`}
				>
					<p>{ratingValue}</p>
				</div>
				<Paper className={styles.workInfo}>
					<p className={styles.header}>{lesson.name}</p>

					<Divider sx={{ margin: "15px 0" }} />

					<div className={styles.studentInfo}>
						<p className={styles.header}>
							{doneWork.student.name} {doneWork.student.surname}
						</p>
						<p>
							{doneWork.student.class?.school},{" "}
							{doneWork.student.class?.class}
						</p>
					</div>

					<Alert severity="warning" sx={{ width: "300px" }}>
						Ожидает проверки
					</Alert>
				</Paper>
				{lesson.questions &&
					lesson.questions.map((question: any, index: any) => (
						<CheckBlock
							index={index}
							setRaitingValue={setRaitingValue}
							key={question._id}
							question={question}
							answer={doneWork.answers[index]}
							setSuccessCriterias={setSuccessCriterias}
						/>
					))}
				<AddComment comment={comment} setComment={setComment} />
			</div>
			<Button
				onClick={handleClick}
				variant="contained"
				endIcon={<DoneIcon />}
			>
				Выставить оценку
			</Button>
		</>
	);
};
