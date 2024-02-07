import { Alert, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ClassBage from "../ClassBage/ClassBage";

import styles from "./Classes.module.css";

import { ClassType } from "@/types/class";

export const Classes = ({ isLoading, navigateToAddClass, classes }: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	if (classes.length === 0) {
		return (
			<>
				<Button
					variant="contained"
					onClick={navigateToAddClass}
					endIcon={<AddIcon />}
					sx={{ marginBottom: "20px" }}
				>
					Добавить класс
				</Button>
				<Alert severity="info" variant="outlined">
					Классов пока нет
				</Alert>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<Button
				variant="contained"
				onClick={navigateToAddClass}
				endIcon={<AddIcon />}
			>
				Добавить класс
			</Button>
			<div className={styles.classesList}>
				{classes.map((oneClass: ClassType) => (
					<ClassBage key={oneClass._id} oneClass={oneClass} />
				))}
			</div>
		</div>
	);
};
