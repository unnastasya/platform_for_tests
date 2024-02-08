import {
	Alert,
	CircularProgress,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";

import styles from "./ReviewDoneWork.module.css";

import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";

export const ReviewDoneWork = ({ isLoading, lesson, doneWork }: any) => {
	if (isLoading) {
		<div className={styles.centered__container}>
			<CircularProgress />
		</div>;
	}

	return (
		<div className={styles.container}>
			<Paper className={styles.questionBlock}>
				<p className={styles.header}>{lesson.name}</p>
				<Divider sx={{ margin: "15px 0" }} />
				<p className={styles.studentInfo}>
					{doneWork.student.name} {doneWork.student.surname}
				</p>
				<p className={styles.classInfo}>
					{doneWork.student.class?.school},{" "}
					{doneWork.student.class?.class}
				</p>

				<Alert sx={{ width: "300px" }} severity="warning">
					Ожидает проверки
				</Alert>
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

						<Divider sx={{ margin: "15px 0" }} />

						<QuestionCriteria question={question} />
					</QuestionBlock>
				))}
		</div>
	);
};
