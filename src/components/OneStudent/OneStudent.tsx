import { Alert, CircularProgress, Paper } from "@mui/material";

import DoneWorkBage from "../DoneWorkBage/DoneWorkBage";

import styles from "./OneStudent.module.css";

export const OneStudent = ({ isLoading, works, user }: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Paper className={styles.studentInfo}>
				<p className={styles.header}>{user?.fullName}</p>
			</Paper>
			{works.length === 0 ? (
				<Alert severity="info" variant="outlined">
					У ученика пока нет сданных работ
				</Alert>
			) : (
				<div className={styles.doneWorks}>
					{works.map((work: any) => (
						<DoneWorkBage work={work} key={work._id} />
					))}
				</div>
			)}
		</div>
	);
};
