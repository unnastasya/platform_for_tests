import {
	Alert,
	CircularProgress,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";

import styles from "./ResultLesson.module.css";

import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 50) return styles.rating__red;
	else if (percentage < 80) return styles.rating__yellow;
	else return styles.rating__green;
};

export const ResultLesson = ({
	isLoading,
	lesson,
	successCriterias,
	doneWork,
}: any) => {
	if (isLoading) {
		return (
			<div className={styles.resultLesson__loadingContainer}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<div className={styles.container}>
				<Paper className={styles.card__container}>
					<div className={styles.lessonInfo}>
						<p className={styles.header}>{lesson.name}</p>
						<p
							className={`${styles.rating} ${whatColor(
								doneWork.rating || 0,
								lesson.allCriteriaRating
							)}`}
						>
							{doneWork.rating}
						</p>
					</div>

					<Divider sx={{ margin: "15px 0" }} />
					<div className={styles.studentInfo}>
						<p className={styles.studentName}>
							{doneWork.student.name} {doneWork.student.surname}
						</p>

						<p>
							{doneWork.student.class?.school},{" "}
							{doneWork.student.class?.class}
						</p>
					</div>
					<Alert sx={{ width: "300px" }} severity="success">
						Проверено
					</Alert>
				</Paper>
				{doneWork.comment && (
					<Paper className={styles.card__container}>
						<p className={styles.grayText}>Комментарий к работе:</p>
						<p className={styles.comment}>{doneWork.comment}</p>
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
							<Divider sx={{ margin: "15px 0" }} />
							<QuestionCriteria
								question={question}
								successCriterias={successCriterias}
							/>
						</QuestionBlock>
					))}
			</div>
		</>
	);
};
