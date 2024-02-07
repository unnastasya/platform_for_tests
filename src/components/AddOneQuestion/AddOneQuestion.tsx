import DeleteIcon from "@mui/icons-material/Delete";
import {
	Alert,
	Button,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";

import AddCriteria from "../AddCriteria/AddCriteria";
import AddImage from "../AddImage/AddImage";

import styles from "./AddOneQuestion.module.css";

export default function AddOneQuestion({
	index,
	register,
	remove,
	setValue,
	control,
	errors,
}: any) {
	return (
		<Paper key={index} className={styles.container}>
			<div className={styles.header}>
				<p className={styles.questionNumber}>Вопрос {index + 1}</p>
				<Button
					color="error"
					variant="outlined"
					aria-label="delete"
					onClick={() => {
						remove(index);
					}}
				>
					<DeleteIcon sx={{ height: "45px", width: "30px" }} />
				</Button>
			</div>
			<div className={styles.questionBlock}>
				<TextField
					{...register(`questions.${index}.questionText`)}
					fullWidth
					multiline
					label="Задание"
					error={!!errors?.questionText?.message}
					helperText={errors?.questionText?.message}
				/>
				<AddImage
					setValue={setValue}
					control={control}
					register={register}
					questionIndex={index}
				/>
				<FormControl fullWidth>
					<TextField label="Поле для ввода ответа" disabled />
				</FormControl>
			</div>

			<Divider sx={{ margin: "15px 0 30px" }} />

			<AddCriteria
				indexQuestion={index}
				register={register}
				control={control}
				errors={errors?.criteria}
			/>

			{errors?.criteria?.type == "min" && (
				<Alert sx={{ marginTop: "15px" }} severity="error">
					{errors.criteria?.message}
				</Alert>
			)}
		</Paper>
	);
}
