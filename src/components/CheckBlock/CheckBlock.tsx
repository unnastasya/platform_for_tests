"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
	Alert,
	Divider,
	FormControl,
	FormGroup,
	Paper,
	TextField,
} from "@mui/material";

import SelectComponent from "../SelectComponent/SelectComponent";

import styles from "./CheckBlock.module.css";

import { QuestionType } from "@/types/lesson";
import { activeUserSelector } from "@/redux/Auth";
import { useAppSelector } from "@/redux/store";

interface CheckBlockProps {
	question: QuestionType;
	setRaitingValue: Dispatch<SetStateAction<number>>;
	answer: string;
	setSuccessCriterias: any;
	index: number;
}

export default function CheckBlock({
	question,
	setRaitingValue,
	answer,
	setSuccessCriterias,
	index,
}: CheckBlockProps) {
	const [count, setCount] = useState(0);

	const activeUser = useAppSelector(activeUserSelector);

	return (
		<Paper className={styles.container}>
			<p className={styles.grayHeader}>Вопрос {index + 1}</p>
			<p className={styles.text}>{question.questionText}</p>

			{question.images.length > 0 && (
				<div className={styles.imagesBlock}>
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

			<Divider sx={{ margin: "15px 0" }} />

			<FormGroup>
				<p className={styles.grayHeader}>Критерии</p>
				<div className={styles.criterias__container}>
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
				</div>
			</FormGroup>
			<Alert
				icon={false}
				variant="outlined"
				severity="info"
				sx={{ color: "#2979FF", width: "213px", borderRadius: "10px" }}
			>
				Набрано баллов: {count} из {question.criteriaRating}
			</Alert>
		</Paper>
	);
}
