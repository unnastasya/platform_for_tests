import { useRouter } from "next/navigation";
import styles from "./AddClassBlock.module.css";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Divider, Paper } from "@mui/material";
import { addClass } from "@/api/classes";
import AddClassHeader from "../AddClassHeader/AddClassHeader";
import AddStudents from "../AddStudents/AddStudents";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback } from "react";
import {
	AddClassActions,
	addClassIsLoadingSelector,
	addClassUsersDataSelector,
	classIsAddedSelector,
} from "@/redux/AddClass";

export default function AddClassBlock() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const studentsData = useAppSelector(addClassUsersDataSelector);
	const isAddedClass = useAppSelector(classIsAddedSelector);
	const isLoading = useAppSelector(addClassIsLoadingSelector);

	const changeRequestData = (data: any) => {
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
			school: "",
			class: "",
			people: [
				{
					name: "",
					surname: "",
				},
			],
		},
	});

	const onSubmit = async (data: any) => {
		changeRequestData(data);
		fetchAddClass();
	};

	const routingToClasses = () => {
		router.push("/classes");
	};

	if (isAddedClass) {
		return (
			<>
				<Paper className={styles.addClassBlock__usersDataContainer}>
					{studentsData.map((student) => (
						<div
							className={
								styles.addClassBlock__oneUserDataContainer
							}
						>
							<p>Имя: {student.fullName}</p>
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
				<AddClassHeader register={register} />

				<Divider />
				<AddStudents control={control} register={register} />
			</form>
		</Paper>
	);
}
