import { Alert, Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

import { AddLessonHeader } from "../AddLessonHeader/AddLessonHeader";
import AddQuestion from "../AddQuestion/AddQuestion";

import styles from "./AddLesson.module.css";

export const AddLesson = ({
	handleSubmit,
	onSubmit,
	register,
	classesData,
	errors,
	control,
	setValue,
}: any) => {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.container}>
				<AddLessonHeader
					register={register}
					classesData={classesData}
					errors={errors}
					control={control}
					name="classes"
				/>

				{!!errors.questions?.message && (
					<Alert severity="error">{errors.questions?.message}</Alert>
				)}

				<AddQuestion
					setValue={setValue}
					control={control}
					register={register}
					errors={errors}
				/>
			</div>
			<Button variant="contained" endIcon={<DoneIcon />} type="submit">
				Сохранить тестирование
			</Button>
		</form>
	);
};
