import {
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
import { Controller, UseFormRegister } from "react-hook-form";

import styles from "./AddLessonHeader.module.css";

import { ClassType } from "@/types/class";

interface AddLessonHeaderProps {
	register: UseFormRegister<any>;
	classesData: ClassType[];
	errors: any;
	control: any;
	name: any;
}

export function AddLessonHeader({
	register,
	classesData,
	errors,
	control,
	name,
}: AddLessonHeaderProps) {
	return (
		<Paper className={styles.container}>
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
