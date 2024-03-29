import { Button, IconButton } from "@mui/material";
import { useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFieldArray } from "react-hook-form";

import styles from "./AddImage.module.css";

export default function AddImage({
	control,
	register,
	questionIndex,
	setValue,
}: any) {
	const inputFileRef = useRef<HTMLInputElement | null>(null);

	const { fields, append, remove } = useFieldArray({
		name: `questions.${questionIndex}.images`,
		control,
	});

	const deleteAllImage = () => {
		setValue(`questions.${questionIndex}.images`, []);
	};

	const addImage = async (file: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			append({ file: reader.result });
		};
	};

	const handleChangeFiles = async (e: any) => {
		try {
			const files = e.target.files;
			for (const file of files) {
				await addImage(file);
			}
		} catch (error) {
			alert("Ошибка при загрузке файла");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.buttonsBlock}>
				<Button
					component="label"
					onClick={() => inputFileRef.current?.click()}
					variant="outlined"
					{...register(`questions.${questionIndex}.images`)}
					startIcon={<AttachFileIcon />}
				>
					Добавить файлы
				</Button>

				<input
					multiple
					ref={inputFileRef}
					type="file"
					hidden
					accept=".jpeg, .png, .jpg"
					onChange={(e: any) => handleChangeFiles(e)}
				/>

				{fields.length > 0 && (
					<Button
						variant="outlined"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={deleteAllImage}
					>
						Удалить все файлы
					</Button>
				)}
			</div>
			{fields.length > 0 && (
				<div className={styles.imagesBlock}>
					{fields.map((field: any, index: any) => {
						return (
							<div
								key={field.id}
								className={styles.oneImage__container}
							>
								<IconButton
									sx={{ position: "absolute" }}
									className={styles.oneImage__delete}
									color="primary"
									onClick={() => remove(index)}
								>
									<ClearIcon />
								</IconButton>
								<img
									className={styles.oneImage__add}
									src={field.file || field.url}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
