import { useFieldArray } from "react-hook-form";
import { Button, Divider, FormControl, Paper, TextField } from "@mui/material";
import { AddCriteria } from "../AddCriteria/AddCriteria";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./AddQuestion.module.css";

export default function AddQuestion({ control, register }: any) {
	const { fields, append, remove } = useFieldArray({
		name: "questions",
		control,
		rules: {
			required: "Пожалуйста, добавьте хотя бы один вопрос",
		},
	});

	return (
		<div>
			{fields.map((field, index) => {
				return (
					<Paper
						key={index}
						className={styles.addQuestion__container}
					>
						<div className={styles.addQuestion__header}>
							<p className={styles.addQuestion__textNumber}>
								Вопрос {index + 1}
							</p>
							<Button
								variant="contained"
								aria-label="delete"
								onClick={() => {
									remove(index);
								}}
							>
								<DeleteIcon
									sx={{ height: "45px", width: "30px" }}
								/>
							</Button>
						</div>
						<div className={styles.addQuestion__nameBlock}>
							<TextField
								{...register(`questions.${index}.questionText`)}
								fullWidth
								multiline
								label="Задание"
							/>
							<TextField
								{...register(`questions.${index}.description`)}
								fullWidth
								multiline
								label="Описание задания"
							/>
							<FormControl fullWidth>
								<TextField
									sx={{ marginBottom: "20px" }}
									id="outlined-multiline-static"
									multiline
									label="Поле для ввода ответа"
									disabled
								/>
							</FormControl>
						</div>

						<Divider />

						<AddCriteria
							indexQuestion={index}
							register={register}
							control={control}
						/>
					</Paper>
				);
			})}
			<Button
				onClick={() => {
					append({
						id: Number(Date.now()),
						question: "",
						description: "",
						criteria: [{ text: "", count: 0 }],
						criteriaRating: 0,
					});
				}}
				variant="outlined"
			>
				Еще вопрос
			</Button>
		</div>
	);
}
