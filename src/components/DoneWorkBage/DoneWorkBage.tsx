import { Alert, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./DoneWorkBage.module.css";
import { DoneWorkType } from "@/types/doneWork";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 20) return styles.rating__question__red;
	else if (percentage < 60) return styles.rating__question__yellow;
	else return styles.rating__question__green;
};

interface DoneWorkBageProps {
	work: DoneWorkType;
}

export default function DoneWorkBage({ work }: DoneWorkBageProps) {
	const router = useRouter();

	const toOneWorkPage = (id: string, workIsVerified: boolean) => {
		if (workIsVerified) {
			router.push(`/resultLesson/${id}`);
		} else {
			router.push(`/checkLesson/${id}`);
		}
	};

	return (
		<div
			key={work._id}
			onClick={() => toOneWorkPage(work._id, work.isVerified)}
			className={styles.clickable}
		>
			<Paper sx={{ margin: 0 }} className={styles.student__work}>
				<p className={styles.student__textHeader}>Урок 21.03.2022</p>
				<p className={styles.student__text}>Описание урока</p>
				{work.rating && (
					<p
						className={`${styles.rating__question} ${whatColor(
							work.rating,
							work.allCriteriaRating
						)}`}
					>
						{work.rating}
					</p>
				)}

				{work.isVerified ? (
					<Alert severity="success">Проверено</Alert>
				) : (
					<Alert severity="warning">Ожидает проверки</Alert>
				)}
			</Paper>
		</div>
	);
}
