"use client";

import { Page } from "@/components/Page/Page";
import { useCallback, useEffect, useState } from "react";
import OneTestBlock from "@/components/OneTestBlock/OneTestBlock";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	LessonsActions,
	lessonsDataSelector,
	lessonsIsLoadingSelector,
} from "@/redux/Lesson/Lessons";
import { CircularProgress } from "@mui/material";

import styles from "./page.module.css";

export default function OpenLessons() {
	const dispatch = useAppDispatch();
	const works = useAppSelector(lessonsDataSelector);

	const isLoading = useAppSelector(lessonsIsLoadingSelector);

	const fetchOpenLessons = useCallback(() => {
		dispatch(LessonsActions.requestActiveUsersOpenLessons());
	}, []);

	useEffect(() => {
		fetchOpenLessons();
	}, []);

	if (isLoading) {
		return (
			<Page>
				<div className={styles.openLessosns__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.openLessosns__container}>
				{works.map((lesson) => (
					<OneTestBlock key={lesson._id} lesson={lesson} />
				))}
			</div>
		</Page>
	);
}
