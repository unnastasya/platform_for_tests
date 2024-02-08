"use client";

import { TextField } from "@mui/material";

import styles from "./AddClassHeader.module.css";

export default function AddClassHeader({ register, errors }: any) {
	return (
		<div className={styles.nameBlock}>
			<TextField
				{...register("school")}
				multiline
				fullWidth
				label="Школа"
				error={!!errors.school?.message}
				helperText={errors.school?.message}
			/>
			<TextField
				{...register("class")}
				multiline
				fullWidth
				label="Класс"
				error={!!errors.class?.message}
				helperText={errors.class?.message}
			/>
		</div>
	);
}
