import { useFieldArray, useWatch } from "react-hook-form";
import { Button, FormControl, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import styles from "./AddCriteria.module.css";

const styleInput = {
	width: "100%",
	m: 0,
	p: 0,
};

const styleInputCount = {
	width: "60px",
	m: 0,
	p: 0,
};

function getTotal(payload: any) {
	let total = 0;
	for (let i = 0; i < payload.length; i++) {
		total =
			total + +(Number.isNaN(payload[i].value) ? 0 : payload[i].value);
	}

	return total;
}

export default function AddCriteria({
	register,
	indexQuestion,
	control,
	errors,
}: any) {
	const { fields, append, remove } = useFieldArray({
		name: `questions.${indexQuestion}.criteria`,
		control,
		rules: {
			required: "Пожалуйста, добавьте хотя бы один вопрос",
		},
	});

	const questionsValues = useWatch({
		control,
		name: `questions.${indexQuestion}.criteria`,
	});

	const appendCriteria = () => {
		append({
			text: "",
			value: 0,
			status: false,
		});
	};

	return (
		<div className={styles.container}>
			<p className={styles.header}>Добавьте критерии</p>

			{fields.map((field, index) => {
				const criteriaErrors = errors?.[index];

				return (
					<div key={field.id} className={styles.oneCriteria}>
						<FormControl sx={styleInput}>
							<TextField
								{...register(
									`questions.${indexQuestion}.criteria.${index}.text`
								)}
								id="outlined-multiline-static"
								error={
									!!criteriaErrors?.text?.message ||
									!!criteriaErrors?.value?.message
								}
								helperText={criteriaErrors?.text?.message}
							/>
						</FormControl>
						<FormControl sx={styleInputCount}>
							<TextField
								type="number"
								{...register(
									`questions.${indexQuestion}.criteria.${index}.value`
								)}
								id="outlined-multiline-static"
								error={!!criteriaErrors?.value?.message}
							/>
						</FormControl>
						<Button
							sx={{ height: "56px" }}
							color="error"
							variant="outlined"
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
				);
			})}
			<Button
				onClick={appendCriteria}
				variant="outlined"
				startIcon={<AddIcon />}
			>
				Еще критерий
			</Button>
			<div>
				<p style={{ display: "inline" }}>Максимальный балл:</p>
				<p className={styles.totalGrade}>{getTotal(questionsValues)}</p>
			</div>
		</div>
	);
}
