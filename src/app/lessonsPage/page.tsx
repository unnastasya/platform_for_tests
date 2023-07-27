"use client";

import { useCallback, useEffect, useState } from "react";
import { getLessons } from "@/api/lessons";
import OneTestBlock from "@/components/OneTestBlock/OneTestBlock";
import { Page } from "@/components/Page/Page";

import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	LessonsActions,
	lessonsDataSelector,
	lessonsIsLoadingSelector,
} from "@/redux/Lesson/Lessons";
import { CircularProgress } from "@mui/material";
import { LessonType } from "@/types/lesson";

export default function LessonsPage() {
	const dispatch = useAppDispatch();
	const lessons: LessonType[] = useAppSelector(lessonsDataSelector);
	const isLoading: boolean = useAppSelector(lessonsIsLoadingSelector);

	const fetchLessons = useCallback(() => {
		dispatch(LessonsActions.requestLessons());
	}, [dispatch]);

	useEffect(() => {
		fetchLessons();
	}, [dispatch, fetchLessons]);

	if (isLoading) {
		return (
			<Page>
                <div className={styles.lessonsPage__loadingContainer}>
				<CircularProgress />
                </div>
			</Page>
		);
	}

	return (
		<>
			<Page>
				<div className={styles.lessonsPage__container}>
					{lessons.map((lesson) => (
						<OneTestBlock key={lesson._id} lesson={lesson} />
					))}
				</div>
			</Page>
		</>
	);
}
