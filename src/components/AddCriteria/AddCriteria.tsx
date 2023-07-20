import { useFieldArray, useWatch } from "react-hook-form";
import styles from "./AddCriteria.module.css";
import { Button, FormControl, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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

export default function AddCriteria({ register, indexQuestion, control }: any) {
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
		});
	};

	return (
		<div className={styles.addCriteria__container}>
			<p className={styles.addCriteria__headerText}>Добавьте критерии</p>
			{fields.map((field, index) => {
				return (
					<div className={styles.addCriteria__oneCriteria}>
						<FormControl sx={styleInput}>
							<TextField
								{...register(
									`questions.${indexQuestion}.criteria.${index}.text`
								)}
								id="outlined-multiline-static"
							/>
						</FormControl>
						<FormControl sx={styleInputCount}>
							<TextField
								type="number"
								{...register(
									`questions.${indexQuestion}.criteria.${index}.value`
								)}
								id="outlined-multiline-static"
							/>
						</FormControl>
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
				);
			})}
			<Button
				onClick={appendCriteria}
				variant="contained"
				startIcon={<AddIcon />}
			>
				Еще критерий
			</Button>
			<div>
				<p style={{ display: "inline" }}>Максимальный балл:</p>
				<p className={styles.addCriteria__totalGrade}>
					{getTotal(questionsValues)}
				</p>
			</div>
		</div>
	);
}
