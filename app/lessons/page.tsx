"use client";

import { useCallback, useEffect } from "react";
import OneTestBlock from "@/components/OneTestBlock/OneTestBlock";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	LessonsActions,
	lessonsDataSelector,
	lessonsIsLoadingSelector,
} from "@/redux/Lesson/Lessons";
import { Button, CircularProgress, Paper } from "@mui/material";
import { LessonType } from "@/types/lesson";
import { activeUserSelector } from "@/redux/Auth";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

import styles from "./page.module.css";

export default function LessonsPage() {
	const dispatch = useAppDispatch();
	const lessons: LessonType[] = useAppSelector(lessonsDataSelector);
	const isLoading: boolean = useAppSelector(lessonsIsLoadingSelector);

	const activeUser = useAppSelector(activeUserSelector);

	const fetchLessons = useCallback(() => {
		if (activeUser.role === "student") {
			dispatch(LessonsActions.requestActiveUsersOpenLessons());
		} else {
			dispatch(LessonsActions.requestLessons());
		}
	}, [activeUser.role]);

	useEffect(() => {
		fetchLessons();
	}, []);

	if (isLoading) {
		return (
			<Page>
				<div className={styles.lessonsPage__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	if (lessons.length === 0) {
		return (
			<Page>
				<div className={styles.lessonsPage__container}>
					<Paper className={styles.lessonsPage__noLessons}>
						<p>
							{activeUser.role === "teacher"
								? "Уроков пока нет"
								: "Доступных уроков пока нет"}
						</p>
					</Paper>
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.lessonsPage__container}>
				{activeUser.role === "teacher" && (
					<Link href="/addLesson">
						<Button variant="contained" endIcon={<AddIcon />}>
							Добавить урок
						</Button>
					</Link>
				)}
				<div className={styles.lessonsPage__testsBlock}>
					{lessons.map((lesson) => (
						<OneTestBlock key={lesson._id} lesson={lesson} />
					))}
				</div>
			</div>
		</Page>
	);
}
