"use client";

import { useCallback, useEffect, useState } from "react";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	MyWorksActions,
	myWorksDataSelector,
	myWorksIsLoadingSelector,
} from "@/redux/MyWorks";
import { CircularProgress } from "@mui/material";

import styles from "./page.module.css";

export default function MyWorks() {
	const dispatch = useAppDispatch();
	const works = useAppSelector(myWorksDataSelector);
	const isLoading = useAppSelector(myWorksIsLoadingSelector);

	const fetchWorks = useCallback(() => {
		dispatch(MyWorksActions.requestMyWorks());
	}, []);

	useEffect(() => {
		fetchWorks();
	}, []);

	if (isLoading) {
		return (
			<Page >
				<div className={styles.myWorks__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.myWorks__container}>
				{works.map((work: any) => (
					<DoneWorkBage work={work} />
				))}
			</div>
		</Page>
	);
}
