"use client";

import { Alert, Button, CircularProgress, Divider, Paper } from "@mui/material";

import AddClassHeader from "../AddClassHeader/AddClassHeader";
import AddStudents from "../AddStudents/AddStudents";

import styles from "./AddClassBlock.module.css";

export default function AddClassBlock({
	handleSubmit,
	onSubmit,
	errors,
	control,
	register,
	isLoading,
	isAddedClass,
	studentsData,
	routingToClasses,
}: any) {
	if (isAddedClass && studentsData.length > 0) {
		return (
			<>
				<Paper className={styles.usersData__container}>
					{studentsData.map((student: any) => (
						<div key={student._id} className={styles.oneUserData}>
							<p>{student.fullName}</p>
							<p>Логин: {student.login}</p>
							<p>Пароль: {student.password}</p>
						</div>
					))}
				</Paper>
				<Button variant="contained" onClick={routingToClasses}>
					Готово
				</Button>
			</>
		);
	}

	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Paper className={styles.container}>
			<form
				className={styles.form}
				onSubmit={handleSubmit((data: any) => {
					onSubmit(data);
				})}
			>
				<AddClassHeader register={register} errors={errors} />

				<Divider />

				{!!errors.people?.message && (
					<Alert severity="error">{errors?.people?.message}</Alert>
				)}

				<AddStudents
					control={control}
					register={register}
					errors={errors}
				/>

				{!(Object.keys(errors).length == 0) && (
					<Alert severity="error">
						Пожалуйста, исправьте ошибки и сохраните класс
					</Alert>
				)}
			</form>
		</Paper>
	);
}
