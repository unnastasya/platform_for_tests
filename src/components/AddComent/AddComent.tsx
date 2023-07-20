"use client";

import { FormControl, TextField } from "@mui/material";

import styles from "./AddComment.module.css";

export default function AddComent({ setComment, comment }: any) {
	return (
		<div className={styles.AddComment__container}>
			<p>Комментарий к работе</p>
			<FormControl fullWidth>
				<TextField
					value={comment}
					onChange={(e) => setComment(e.currentTarget.value)}
					multiline
					label="Комментарий"
				/>
			</FormControl>
		</div>
	);
}
