"use client";

import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { useCallback, useEffect } from "react";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
} from "@/redux/DoneWork/DoneWorks";
import { Alert, CircularProgress, Paper } from "@mui/material";

import styles from "./page.module.css";

export default function DoneWorks() {
	const works = useAppSelector(doneWorksDataSelector);
	const worksIsLoading: boolean = useAppSelector(doneWorksIsLoadingSelector);

	const dispatch = useAppDispatch();

	const fetchDoneWorks = useCallback(() => {
		dispatch(DoneWorksActions.requestDoneWorks());
	}, [dispatch]);

	useEffect(() => {
		fetchDoneWorks();
	}, [dispatch, fetchDoneWorks]);

	if (worksIsLoading) {
		return (
			<Page>
				<div className={styles.doneWorks__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	if (works.length === 0) {
		return (
			<Page>
				<Alert severity="info" variant="outlined">
					Сданных работ пока нет
				</Alert>
			</Page>
		);
	} else {
		return (
			<Page>
				<div className={styles.doneWorks__page}>
					{works.map((work: any) => (
						<DoneWorkBage work={work} key={work._id} />
					))}
				</div>
			</Page>
		);
	}
}
