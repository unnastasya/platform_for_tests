import { FormControl, TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { DataDoneWork } from "@/types/dataDoneWork";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector } from "@/redux/Auth";

import styles from "./QuestionInput.module.css";

interface QuestionInputProps {
	index: number;
	register: UseFormRegister<DataDoneWork>;
}

export default function QuestionInput({ index, register }: QuestionInputProps) {
	const activeUser = useAppSelector(activeUserSelector);

	return (
		<div className={styles.questionInput__container}>
			<FormControl fullWidth>
				<TextField
					disabled={activeUser.role === "teacher"}
					{...register(`answers.${index}`)}
					multiline
					label="Введите ваш ответ"
				/>
			</FormControl>
		</div>
	);
}
