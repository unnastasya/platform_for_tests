"use client";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./CheckBlock.module.css";
import {
	Divider,
	FormControl,
	FormGroup,
	Paper,
	TextField,
} from "@mui/material";
import SelectComponent from "../SelectComponent/SelectComponent";
import { QuestionType } from "@/types/lesson";

interface CheckBlockProps {
	question: QuestionType;
	setRaitingValue: Dispatch<SetStateAction<number>>;
	answer: string;
}

export default function CheckBlock({
	question,
	setRaitingValue,
	answer,
}: CheckBlockProps) {
	const [count, setCount] = useState(0);

	return (
		<Paper className={styles.checkBlock__container}>
			<p className={styles.checkBlock__container_text}>
				{question.questionText}
			</p>
			<p className={styles.checkBlock__container_text}>
				{question.description}
			</p>
			{question.images.length > 0 && (
				<div className={styles.checkBlock__imagesBlock}>
					{question.images.map((image, index) => (
						<img key={index} style={{ width: "600px" }} src={image.url} />
					))}
				</div>
			)}
			<FormControl fullWidth>
				<TextField multiline label="Ответ ученика" value={answer} />
			</FormControl>
			<Divider />
			<FormGroup>
				{question.criteria.map((criterion: any) => (
					<SelectComponent
						key={criterion._id}
						setRaitingValue={setRaitingValue}
						criterion={criterion}
						setCount={setCount}
					/>
				))}
			</FormGroup>
			<Divider />
			<div className={styles.checkBlock__badge}>
				<p className={styles.checkBlock__badge__text}>
					Набрано баллов: {count} из {question.criteriaRating}
				</p>
			</div>
		</Paper>
	);
}
