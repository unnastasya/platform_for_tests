"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Alert, Button, CircularProgress, Divider, Paper } from "@mui/material";
import AddClassHeader from "../AddClassHeader/AddClassHeader";
import AddStudents from "../AddStudents/AddStudents";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";
import {
	AddClassActions,
	addClassIsLoadingSelector,
	addClassUsersDataSelector,
	classIsAddedSelector,
	editClassDataSelector,
	editClassIdDataSelector,
} from "@/redux/Class/AddClass";

import styles from "./AddClassBlock.module.css";
import { activeUserIdSelector } from "@/redux/Auth";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassSchema } from "./ClassSchema";

export default function AddClassBlock() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const studentsData = useAppSelector(addClassUsersDataSelector);
	const isAddedClass = useAppSelector(classIsAddedSelector);
	const isLoading = useAppSelector(addClassIsLoadingSelector);

	const editClassId = useAppSelector(editClassIdDataSelector || null);
	const editClassData = useAppSelector(editClassDataSelector || null);

	const activeUserId = useAppSelector(activeUserIdSelector);

	const changeRequestData = (data: any): any => {
		dispatch(AddClassActions.changeRequestData(data));
	};

	const fetchAddClass = useCallback(() => {
		dispatch(AddClassActions.addClass());
	}, [dispatch]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			school: editClassData?.school || "",
			class: editClassData?.class || "",
			people: editClassData?.students || [
				{
					name: "",
					surname: "",
				},
			],
			authorId: editClassData?.authorId || activeUserId,
		},
		resolver: yupResolver(ClassSchema),
	});

	const onSubmit = (data: any) => {
		let value = { ...data };

		if (editClassId) {
			changeRequestData(value);
			dispatch(AddClassActions.editClass());
		} else {
			changeRequestData(value);
			fetchAddClass();
		}
	};

	const routingToClasses = () => {
		dispatch(AddClassActions.changeIsAddedClass(false));
		dispatch(AddClassActions.changeClassIsAddedToFalse());
		router.push("/classes");
	};

	useEffect(() => {
		if (isAddedClass && studentsData.length == 0) {
			routingToClasses();
		}
	}, [isAddedClass]);

	if (isAddedClass && studentsData.length > 0) {
		return (
			<>
				<Paper className={styles.addClassBlock__usersDataContainer}>
					{studentsData.map((student) => (
						<div
							key={student._id}
							className={
								styles.addClassBlock__oneUserDataContainer
							}
						>
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
			<div className={styles.addClassBlock__loadingContainer}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Paper className={styles.addClass__container}>
			<form
				className={styles.addClass__form}
				onSubmit={handleSubmit((data) => {
					onSubmit(data);
				})}
			>
				<AddClassHeader register={register} errors={errors} />

				<Divider />

				{!!errors.people?.message && (
					<Alert severity="error">{errors.people?.message}</Alert>
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
