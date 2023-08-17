"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
	Divider,
	FormControl,
	FormGroup,
	Paper,
	TextField,
} from "@mui/material";
import SelectComponent from "../SelectComponent/SelectComponent";
import { QuestionType } from "@/types/lesson";
import { activeUserSelector } from "@/redux/Auth";
import { useAppSelector } from "@/redux/store";

import styles from "./CheckBlock.module.css";

interface CheckBlockProps {
	question: QuestionType;
	setRaitingValue: Dispatch<SetStateAction<number>>;
	answer: string;
	successCriterias: any;
	setSuccessCriterias: any;
}

export default function CheckBlock({
	question,
	setRaitingValue,
	answer,
	successCriterias,
	setSuccessCriterias,
}: CheckBlockProps) {
	const [count, setCount] = useState(0);

	const activeUser = useAppSelector(activeUserSelector);

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
						<img
							key={index}
							style={{ width: "600px" }}
							src={image.url}
						/>
					))}
				</div>
			)}
			<FormControl fullWidth>
				<TextField multiline label="Ответ ученика" value={answer} />
			</FormControl>
			<Divider />
			<FormGroup>
				{activeUser.role == "teacher" &&
					question.criteria.map((criterion: any) => (
						<SelectComponent
							key={criterion._id}
							setRaitingValue={setRaitingValue}
							criterion={criterion}
							setCount={setCount}
							setSuccessCriterias={setSuccessCriterias}
						/>
					))}
				{activeUser.role == "student" &&
					question.criteria.map((criterion: any) => (
						<p key={criterion._id}>
							{criterion.text} - {criterion.value} балла
						</p>
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
