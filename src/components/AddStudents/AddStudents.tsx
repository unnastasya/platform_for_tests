"use client";

import { useFieldArray } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button, FormControl, TextField } from "@mui/material";
import { useAppSelector } from "@/redux/store";
import { editClassIdDataSelector } from "@/redux/Class/AddClass";

import styles from "./AddStudents.module.css";

const styleInput = {
	width: "100%",
	m: 0,
	p: 0,
};

export default function AddStudents({ control, register }: any) {
	const { fields, append, remove } = useFieldArray({
		name: "people",
		control,
	});

	const editClassId = useAppSelector(editClassIdDataSelector || null);

	const appendStudent = () => {
		append({
			name: "",
			surname: "",
		});
	};

	return (
		<div className={styles.addStudent__container}>
			<p className={styles.addStudent__textHeader}>Добавьте учеников</p>

			{fields.map((field, index) => {
				return (
					<section
						key={field.id}
						className={styles.addStudent__oneSrudent}
					>
						<FormControl sx={styleInput}>
							<TextField
								{...register(`people.${index}.name`)}
								label="Имя"
							/>
						</FormControl>
						<FormControl sx={styleInput}>
							<TextField
								{...register(`people.${index}.surname`)}
								label="Фамилия"
							/>
						</FormControl>
						<Button
							variant="contained"
							type="button"
							onClick={() => {
								remove(index);
							}}
						>
							<DeleteIcon
								sx={{ height: "45px", width: "30px" }}
							/>
						</Button>
					</section>
				);
			})}
			<div className={styles.addStudents__buttonsBlock}>
				<Button
					variant="outlined"
					type="button"
					startIcon={<AddIcon />}
					onClick={appendStudent}
				>
					Добавить ученика
				</Button>
				<Button
					variant="contained"
					startIcon={<GroupAddIcon />}
					type="submit"
				>
					{editClassId ? "Обновить класс" : "Сохранить класс"}
				</Button>
			</div>
		</div>
	);
}
