import { Paper } from "@mui/material";
import { QuestionType } from "@/types/lesson";

import styles from "./QuestionBlock.module.css";

interface QuestionBlockProps {
	children: React.ReactNode;
	question: QuestionType;
	index: number;
}

export default function QuestionBlock({
	children,
	question,
	index,
}: QuestionBlockProps) {
	return (
		<Paper className={styles.questionBlock__container}>
			<div className={styles.questionBlock__infoBlock}>
				<p className={styles.questionBlock__infoBlock_questionNumber}>
					Вопрос {index + 1}
				</p>
				<p className={styles.questionBlock_questionText}>
					{question.questionText}
				</p>
				<p>{question.description}</p>
			</div>
			{children}
		</Paper>
	);
}
