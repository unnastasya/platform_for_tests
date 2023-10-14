"use client";
import { useFieldArray } from "react-hook-form";
import { Button } from "@mui/material";
import AddOneQuestion from "../AddOneQuestion/AddOneQuestion";
import AddIcon from "@mui/icons-material/Add";

import styles from "./AddQuestion.module.css";

export default function AddQuestion({
	control,
	register,
	setValue,
	errors,
}: any) {
	const { fields, append, remove } = useFieldArray({
		name: "questions",
		control,
	});

	const appendQuestion = () => {
		append({
			images: [],
			questionText: "",
			description: "",
			criteria: [{ text: "", value: 0, status: false }],
			criteriaRating: 0,
		});
	};

	return (
		<div>
			<div className={styles.addQuestions__container}>
				{fields.map((field, index) => {
					return (
						<AddOneQuestion
							key={index}
							index={index}
							register={register}
							remove={remove}
							setValue={setValue}
							control={control}
							errors={errors.questions?.[index]}
						/>
					);
				})}
			</div>
			<Button
				endIcon={<AddIcon />}
				onClick={appendQuestion}
				variant="outlined"
			>
				Еще вопрос
			</Button>
		</div>
	);
}
