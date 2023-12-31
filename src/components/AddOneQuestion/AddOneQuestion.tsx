import DeleteIcon from "@mui/icons-material/Delete";
import AddCriteria from "../AddCriteria/AddCriteria";
import AddImage from "../AddImage/AddImage";
import {
	Alert,
	Button,
	Divider,
	FormControl,
	Paper,
	TextField,
} from "@mui/material";

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
		<Paper key={index} className={styles.oneAddQuestion__container}>
			<div className={styles.addQuestion__header}>
				<p className={styles.addQuestion__textNumber}>
					Вопрос {index + 1}
				</p>
				<Button
					variant="outlined"
					aria-label="delete"
					onClick={() => {
						remove(index);
					}}
				>
					<DeleteIcon sx={{ height: "45px", width: "30px" }} />
				</Button>
			</div>
			<div className={styles.addQuestion__nameBlock}>
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
					<TextField
						sx={{ marginBottom: "20px" }}
						label="Поле для ввода ответа"
						disabled
					/>
				</FormControl>
			</div>

			<Divider />

			{errors?.criteria?.type == "min" && (
				<Alert severity="error">{errors.criteria?.message}</Alert>
			)}

			<AddCriteria
				indexQuestion={index}
				register={register}
				control={control}
				errors={errors?.criteria}
			/>
		</Paper>
	);
}
