import { Paper } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./OneTestBlock.module.css";
import { LessonType } from "@/types/lesson";

interface OneTestBlockProps {
	lesson: LessonType;
}

export default function OneTestBlock({ lesson }: OneTestBlockProps) {
	const router = useRouter();

	const linkToTest = () => {
		router.push(`/oneLessonPage/${lesson._id}`);
	};

	return (
		<Paper onClick={linkToTest} className={styles.oneTest__block}>
			<div className={styles.oneTest__infoBlock}>
				<p className={styles.oneTest__lessonName}>{lesson.name}</p>
				<div className={styles.oneTest__classesBlock}>
					{lesson.classes.map((les: any) => (
						<p key={les._id} className={styles.oneTest__text}>
							{les.school},{les.class}
						</p>
					))}
				</div>
			</div>

			<p className={styles.oneTest__textCount}>
				Сдало: {lesson.doneCount} человек
			</p>
		</Paper>
	);
}
