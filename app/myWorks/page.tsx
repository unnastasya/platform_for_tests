"use client";

import { useCallback, useEffect } from "react";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CircularProgress, Paper } from "@mui/material";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
} from "@/redux/DoneWork/DoneWorks";

import styles from "./page.module.css";

export default function MyWorks() {
	const dispatch = useAppDispatch();
	const works = useAppSelector(doneWorksDataSelector);
	const isLoading = useAppSelector(doneWorksIsLoadingSelector);

	const fetchWorks = useCallback(() => {
		dispatch(DoneWorksActions.requestActiveUsersDoneWorks());
	}, []);

	useEffect(() => {
		fetchWorks();
	}, []);

	if (isLoading) {
		return (
			<Page>
				<div className={styles.myWorks__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	if (works.length === 0) {
		return (
			<Page>
				<div className={styles.myWorks__container}>
					<Paper className={styles.myWorks__noLessons}>
						<p>У вас пока нет сданных работ</p>
					</Paper>
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.myWorks__container}>
				{works.map((work: any) => (
					<DoneWorkBage work={work} key={work._id} />
				))}
			</div>
		</Page>
	);
}
