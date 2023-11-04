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
import { ClassType } from "@/types/class";
import { Controller, UseFormRegister } from "react-hook-form";

import styles from "./AddLessonHeader.module.css";
import { CheckBox } from "@mui/icons-material";

interface AddLessonHeaderProps {
	register: UseFormRegister<any>;
	classesData: ClassType[];
	checkedClass: any[];
	setCheckedClass: (data: any) => void;
	errors: any;
	control: any;
	name: any;
}

export function AddLessonHeader({
	register,
	setCheckedClass,
	checkedClass,
	classesData,
	errors,
	control,
	name,
}: AddLessonHeaderProps) {
	return (
		<Paper className={styles.addLessonHeader__container}>
			<TextField
				{...register("name")}
				fullWidth
				multiline
				label="Тема урока"
				error={!!errors.name?.message}
				helperText={errors.name?.message}
			/>

			<FormControl>
				<InputLabel>Выбрать классы</InputLabel>
				<Controller
					render={({ field: { onChange, value } }) => (
						<Select multiple value={value} onChange={onChange}>
							{classesData.map((option: any) => {
								console.log("option", option);
								return (
									<MenuItem
										key={option._id}
										value={option._id}
									>
										{option.school}, {option.class}
									</MenuItem>
								);
							})}
						</Select>
					)}
					control={control}
					name={name}
				/>
			</FormControl>
		</Paper>
	);
}
