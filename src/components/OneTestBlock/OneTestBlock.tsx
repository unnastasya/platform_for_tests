import { Alert, Divider, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./OneTestBlock.module.css";

import { LessonType } from "@/types/lesson";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

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
			<Paper onClick={linkToTest} className={styles.container}>
				<div>
					<p className={styles.header}>{lesson.name}</p>

					{lesson.classes[0]?.school && lesson.classes[0]?.class && (
						<>
							<Divider sx={{ margin: "15px 0" }} />
							<div className={styles.classesInfo}>
								{lesson.classes.map((oneClass: any) => (
									<p
										key={oneClass._id}
										className={styles.text}
									>
										{oneClass.school}, {oneClass.class}
									</p>
								))}
							</div>
						</>
					)}
				</div>

				{activeUser.role == "teacher" && (
					<Alert severity="info" icon={false}>
						Сдало: {lesson.doneCount} человек
					</Alert>
				)}
			</Paper>
		</div>
	);
}
