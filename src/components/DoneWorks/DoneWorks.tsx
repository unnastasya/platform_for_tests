import { Alert, CircularProgress } from "@mui/material";

import DoneWorkBage from "../DoneWorkBage/DoneWorkBage";

import styles from "./DoneWorks.module.css";

export const DoneWorks = ({ isLoading, works }: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	if (works.length === 0) {
		return (
			<Alert severity="info" variant="outlined">
				Сданных работ пока нет
			</Alert>
		);
	}

	return (
		<div className={styles.container}>
			{works.map((work: any) => (
				<DoneWorkBage work={work} key={work._id} />
			))}
		</div>
	);
};
