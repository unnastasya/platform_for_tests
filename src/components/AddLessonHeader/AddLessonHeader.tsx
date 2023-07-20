import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { getAllClasses } from "@/api/classes";

import styles from "./AddLessonHeader.module.css";
import { ClassType } from "@/types/class";
import { UseFormRegister } from "react-hook-form";

interface AddLessonHeaderProps {
	register: UseFormRegister<any>;
	classesData: ClassType[];
	setClassesData: Dispatch<SetStateAction<ClassType[]>>;
	checkedClass: any[];
	setCheckedClass: (data: any) => void;
}

export function AddLessonHeader({
	register,
	setClassesData,
	setCheckedClass,
	checkedClass,
	classesData,
}: AddLessonHeaderProps) {
	useEffect(() => {
		getAllClasses().then((res) => setClassesData(res));
	}, []);

	const handleChange = (event: SelectChangeEvent<any[]>) => {
		const {
			target: { value },
		} = event;
		setCheckedClass(typeof value === "string" ? value.split(",") : value);
	};

	const renderSelected = (selected: any) => {
		return selected
			.map((option: any) => `${option.school} ${option.class}`)
			.join(", ");
	};

	return (
		<Paper className={styles.addLessonHeader__container}>
			<TextField
				{...register("name")}
				fullWidth
				multiline
				label="Тема урока"
			/>

			<TextField
				{...register("description")}
				multiline
				label="Описание"
			/>

			<FormControl>
				<InputLabel>Выбрать классы</InputLabel>
				<Select
					multiple
					value={checkedClass}
					onChange={handleChange}
					input={<OutlinedInput label="Выбрать классы" />}
					renderValue={(selected: any) => renderSelected(selected)}
				>
					{classesData.map((option: any) => (
						<MenuItem key={option._id} value={option}>
							<Checkbox
								checked={checkedClass.indexOf(option) > -1}
							/>
							<ListItemText
								primary={option.school + ", " + option.class}
							/>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Paper>
	);
}
