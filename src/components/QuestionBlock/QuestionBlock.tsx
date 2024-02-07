import { Paper } from "@mui/material";

import styles from "./QuestionBlock.module.css";

import { QuestionType } from "@/types/lesson";

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
		<Paper className={styles.container}>
			<div className={styles.infoBlock}>
				<p className={styles.questionNumber}>Вопрос {index + 1}</p>
				<p className={styles.questionText}>{question.questionText}</p>

				{question.images.length > 0 && (
					<div className={styles.imagesBlock}>
						{question.images.map((image, index) => (
							<img
								className={styles.image}
								key={index}
								src={image.url}
							/>
						))}
					</div>
				)}
			</div>
			{children}
		</Paper>
	);
}
