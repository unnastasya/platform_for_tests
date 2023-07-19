import { FormControl, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { DataDoneWork } from "@/types/dataDoneWork";

import styles from "./QuestionInput.module.css";

interface QuestionInputProps {
	index: number;
	register: UseFormRegister<DataDoneWork>;
}

export default function QuestionInput({ index, register }: QuestionInputProps) {
	return (
		<div className={styles.questionInput__container}>
			<FormControl fullWidth>
				<TextField
					{...register(`answers.${index}`)}
					multiline
					label="Введите ваш ответ"
				/>
			</FormControl>
		</div>
	);
}
