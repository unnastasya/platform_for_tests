import { Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { LessonType } from "@/types/lesson";

import styles from "./OneTestBlock.module.css";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

interface OneTestBlockProps {
	lesson: LessonType;
}

export default function OneTestBlock({ lesson }: OneTestBlockProps) {
	const router = useRouter();

	const linkToTest = () => {
		router.push(`/oneLessonPage/${lesson._id}`);
	};

	console.log(lesson);
	const activeUser = useAppSelector(activeUserSelector);

	return (
		<div>
			<Paper onClick={linkToTest} className={styles.oneTest__container}>
				<p className={styles.oneTest__lessonName}>{lesson.name}</p>

				{lesson.classes[0].school && lesson.classes[0].class && (
					<div className={styles.oneTest__classesBlock}>
						{lesson.classes.map((oneClass: any) => (
							<p
								key={oneClass._id}
								className={styles.oneTest__text}
							>
								{oneClass.school},{oneClass.class}
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
