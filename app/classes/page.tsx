"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Button, CircularProgress, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClassBage from "@/components/ClassBage/ClassBage";
import { Page } from "@/components/Page/Page";
import { ClassType } from "@/types/class";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	ClassesActions,
	classesDataSelector,
	classesIsLoadingSelector,
} from "@/redux/Class/Classes";
import { AddClassActions } from "@/redux/Class/AddClass";

import styles from "./page.module.css";

export default function Classes() {
	const router = useRouter();
	const classes: ClassType[] = useAppSelector(classesDataSelector);
	const classesIsLoading: boolean = useAppSelector(classesIsLoadingSelector);
	const dispatch = useAppDispatch();

	const fetchClasses = useCallback(() => {
		dispatch(ClassesActions.requestClasses());
	}, []);

	useEffect(() => {
		fetchClasses();
	}, []);

	const navigateToAddClass = () => {
		dispatch(AddClassActions.changeEditClassIdData({}));
		router.push("/addClass");
	};

	if (classesIsLoading) {
		return (
			<Page>
				<div className={styles.classes__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	if (classes.length === 0) {
		return (
			<Page>
				<div className={styles.classes__container}>
					<Button
						variant="contained"
						onClick={navigateToAddClass}
						endIcon={<AddIcon />}
					>
						Добавить класс
					</Button>
					<Paper className={styles.classes__noLessons}>
						<p>Классов пока нет</p>
					</Paper>
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.classes__container}>
				<Button
					variant="contained"
					onClick={navigateToAddClass}
					endIcon={<AddIcon />}
				>
					Добавить класс
				</Button>
				<div className={styles.classes__classesList}>
					{classes.map((oneClass: ClassType) => (
						<ClassBage key={oneClass._id} oneClass={oneClass} />
					))}
				</div>
			</div>
		</Page>
	);
}
