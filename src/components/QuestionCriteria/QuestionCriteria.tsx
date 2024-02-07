import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./QuestionCriteria.module.css";

import { QuestionType } from "@/types/lesson";

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
			<div className={styles.container}>
				<p className={styles.header}>Критерии оценки</p>
				<ul className={styles.criteriaList}>
					{question.criteria.map((criteria: any) => (
						<li className={styles.listItem} key={criteria.text}>
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
			<div className={styles.container}>
				<p className={styles.header}>Критерии оценки</p>
				<ul className={styles.criteriaList}>
					{question.criteria.map((criteria: any) => (
						<li className={styles.listItem} key={criteria.text}>
							{criteria.text} - {criteria.value} балла
						</li>
					))}
				</ul>
			</div>
		);
	}
}
