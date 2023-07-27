"use client";

import { getDoneWorks } from "@/api/doneWorks";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { useCallback, useEffect, useState } from "react";
import { Page } from "@/components/Page/Page";

import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
} from "@/redux/DoneWork/DoneWorks";
import { CircularProgress } from "@mui/material";

export default function DoneWorks() {
	// const [works, setWorks] = useState<any[]>([]);
	const works = useAppSelector(doneWorksDataSelector);
	const worksIsLoading: boolean = useAppSelector(doneWorksIsLoadingSelector);

	const dispatch = useAppDispatch();

	const fetchDoneWorks = useCallback(() => {
		dispatch(DoneWorksActions.requestDoneWorks());
	}, [dispatch]);

	useEffect(() => {
		fetchDoneWorks();
	}, [dispatch, fetchDoneWorks]);

	// useEffect(() => {
	// 	getDoneWorks().then((res) => setWorks(res));
	// }, []);

	if (worksIsLoading) {
		return (
			<Page>
				<div className={styles.doneWorks__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

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
