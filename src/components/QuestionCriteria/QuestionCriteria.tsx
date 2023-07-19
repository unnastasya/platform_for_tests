import { QuestionType } from "@/types/lesson";

import styles from "./QuestionCriteria.module.css";

interface QuestionCriteriaProps {
	question: QuestionType;
}

export default function QuestionCriteria({ question }: QuestionCriteriaProps) {
	return (
		<div className={styles.questionCriteria__container}>
			<p className={styles.questionCriteria__textHeader}>
				Критерии оценки
			</p>
			<ul className={styles.questionCriteria__list}>
				{question.criteria.map((criteria: any) => (
					<li key={criteria._id}>
						{criteria.text} - {criteria.value} балла
					</li>
				))}
			</ul>
		</div>
	);
}
