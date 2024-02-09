import { Alert, CircularProgress } from "@mui/material";

import DoneWorkBage from "../DoneWorkBage/DoneWorkBage";

import styles from "./MyWorks.module.css";

export const MyWorks = ({ isLoading, works }: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	if (works.length === 0) {
		return (
			<Alert variant="outlined" severity="info">
				У вас пока нет сданных работ
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
