import { Alert, Divider, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./DoneWorkBage.module.css";

import { DoneWorkType } from "@/types/doneWork";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

const whatColor = (value: number, allCriteriaRating: number) => {
	const percentage = (value / allCriteriaRating) * 100;

	if (percentage < 50) return styles.rating__red;
	else if (percentage < 80) return styles.rating__yellow;
	else return styles.rating__green;
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
		<Paper
			className={styles.container}
			onClick={() => toOneWorkPage(work._id, work.isVerified)}
		>
			<div>
				<div className={styles.cardTop}>
					<p className={styles.header}>{work.lessonId.name}</p>

					{(!!work.rating || (work.rating == 0 && work.isVerified)) && (
						<p
							className={`${styles.rating} ${whatColor(
								work.rating,
								work.allCriteriaRating
							)}`}
						>
							{work.rating}
						</p>
					)}
				</div>

				<Divider sx={{ margin: "15px 0 10px" }} />

				<p className={styles.studentInfo}>
					{work.student.surname} {work.student.name}
				</p>

				<p className={styles.classInfo}>
					{work.student.class?.school} {work.student.class?.class}
				</p>
			</div>

			{work.isVerified ? (
				<Alert className={styles.alert} severity="success">
					Проверено
				</Alert>
			) : (
				<Alert className={styles.alert} severity="warning">
					Ожидает проверки
				</Alert>
			)}
		</Paper>
	);
}
