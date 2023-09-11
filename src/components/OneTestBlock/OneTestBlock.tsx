import { Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { LessonType } from "@/types/lesson";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

import styles from "./OneTestBlock.module.css";

interface OneTestBlockProps {
	lesson: LessonType;
}

export default function OneTestBlock({ lesson }: OneTestBlockProps) {
	const router = useRouter();

	const linkToTest = () => {
		router.push(`/oneLesson/${lesson._id}`);
	};

	const activeUser = useAppSelector(activeUserSelector);

	return (
		<div>
			<Paper onClick={linkToTest} className={`${styles.oneTest__container} ${
								lesson.isVisible
									? styles.oneTest__container__visible
									: styles.oneTest__container__notvisible
							}`}>
				<p className={styles.oneTest__lessonName}>{lesson.name}</p>
				{lesson.classes[0]?.school && lesson.classes[0]?.class && (
					<div className={styles.oneTest__classesBlock}>
						{lesson.classes.map((oneClass: any) => (
							<p
								key={oneClass._id}
								className={styles.oneTest__text}
							>
								{oneClass.school}, {oneClass.class}
							</p>
						))}
					</div>
				)}

				{activeUser.role == "teacher" && (
					<p className={styles.oneTest__textCount}>
						Сдало: {lesson.doneCount} человек
					</p>
				)}
			</Paper>
		</div>
	);
}
