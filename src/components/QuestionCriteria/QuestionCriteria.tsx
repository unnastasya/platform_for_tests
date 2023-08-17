import { QuestionType } from "@/types/lesson";

import styles from "./QuestionCriteria.module.css";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface QuestionCriteriaProps {
	question: QuestionType;
	successCriterias?: any[];
}

export default function QuestionCriteria({
	question,
	successCriterias,
}: QuestionCriteriaProps) {
	if (!!successCriterias) {
		return (
			<div className={styles.questionCriteria__container}>
				<p className={styles.questionCriteria__textHeader}>
					Критерии оценки
				</p>
				<ul className={styles.questionCriteria__list}>
					{question.criteria.map((criteria: any) => (
						<li
							className={styles.questionCriteria__listItem}
							key={criteria.text}
						>
							{successCriterias.includes(criteria._id) ? (
								<DoneIcon color="success" />
							) : (
								<CloseIcon color="error" />
							)}
							{criteria.text} - {criteria.value} балла
						</li>
					))}
				</ul>
			</div>
		);
	} else {
		return (
			<div className={styles.questionCriteria__container}>
				<p className={styles.questionCriteria__textHeader}>
					Критерии оценки
				</p>
				<ul className={styles.questionCriteria__list}>
					{question.criteria.map((criteria: any) => (
						<li
							className={styles.questionCriteria__listItem}
							key={criteria.text}
						>
							{criteria.text} - {criteria.value} балла
						</li>
					))}
				</ul>
			</div>
		);
	}
}
