"use client";

import { TextField } from "@mui/material";

import styles from "./AddClassHeader.module.css";

export default function AddClassHeader({ register }: any) {
	return (
		<div className={styles.addClass__nameBlock}>
			<p className={styles.addStudent__textHeader}>Школа</p>
			<TextField
				{...register("school")}
				multiline
				fullWidth
				label="Школа"
			/>
			<p className={styles.addStudent__textHeader}>Класс</p>
			<TextField
				{...register("class")}
				multiline
				fullWidth
				label="Класс"
			/>
		</div>
	);
}
