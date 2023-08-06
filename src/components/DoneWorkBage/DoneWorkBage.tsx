import { Alert, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { DoneWorkType } from "@/types/doneWork";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

import styles from "./DoneWorkBage.module.css";
import { useEffect } from "react";

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
	const activeUser = useAppSelector(activeUserSelector);

	const toOneWorkPage = (id: string, workIsVerified: boolean) => {
		if (workIsVerified) {
			router.push(`/resultLesson/${id}`);
		} else {
			if (activeUser.role == "student") {
				router.push(`/reviewDoneWork/${id}`);
			} else {
				router.push(`/checkLesson/${id}`);
			}
		}
	};

	return (
		<Paper sx={{ margin: 0 }} className={styles.student__work}>
			<div
				key={work._id}
				onClick={() => toOneWorkPage(work._id, work.isVerified)}
				className={styles.clickable}
			>
				<p className={styles.student__textHeader}>
					{work.lessonId.name}
				</p>
				<p className={styles.student__text}>
					{work.lessonId.description}
				</p>
				<p className={styles.student__text}>
					{work.student.surname} {work.student.name}
				</p>
				<p className={styles.student__text}>
					{work.student.class?.school} {work.student.class?.class}
				</p>
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
					<Alert className={styles.alert} severity="success">
						Проверено
					</Alert>
				) : (
					<Alert className={styles.alert} severity="warning">
						Ожидает проверки
					</Alert>
				)}
			</div>
		</Paper>
	);
}
