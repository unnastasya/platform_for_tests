import { Alert, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import OneTestBlock from "../OneTestBlock/OneTestBlock";

import styles from "./Lessons.module.css";

export const Lessons = ({
	isLoading,
	lessons,
	activeUser,
	goToAddLesson,
}: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	if (lessons.length === 0) {
		return (
			<>
				{activeUser.role === "teacher" && (
					<Button
						onClick={goToAddLesson}
						variant="contained"
						endIcon={<AddIcon />}
						sx={{ marginBottom: "30px" }}
					>
						Добавить урок
					</Button>
				)}
				<Alert severity="info" variant="outlined">
					{activeUser.role === "teacher"
						? "Уроков пока нет"
						: "Доступных уроков пока нет"}
				</Alert>
			</>
		);
	}

	return (
		<>
			{activeUser.role === "teacher" && (
				<Button
					onClick={goToAddLesson}
					variant="contained"
					endIcon={<AddIcon />}
					sx={{ marginBottom: "30px" }}
				>
					Добавить урок
				</Button>
			)}
			<div className={styles.container}>
				<div className={styles.testsBlock}>
					{lessons.map((lesson: any) => (
						<OneTestBlock key={lesson._id} lesson={lesson} />
					))}
				</div>
			</div>
		</>
	);
};
