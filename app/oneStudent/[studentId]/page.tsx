"use client";

import { Alert, CircularProgress, Paper } from "@mui/material";
import { useCallback, useEffect } from "react";
import { Page } from "@/components/Page/Page";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
	openUserSelector,
} from "@/redux/DoneWork/DoneWorks";

import styles from "./page.module.css";

interface OneStudentProps {
	params: {
		studentId: string;
	};
}

export default function OneStudent({ params }: OneStudentProps) {
	const dispatch = useAppDispatch();
	const studentId = params.studentId;
	const works = useAppSelector(doneWorksDataSelector);
	const user = useAppSelector(openUserSelector);
	const isLoading = useAppSelector(doneWorksIsLoadingSelector);

	const fetchStudentsDoneWorks = useCallback(() => {
		dispatch(DoneWorksActions.changeRequestIdData(studentId));
		dispatch(DoneWorksActions.requesOneUsersDoneWorks());
	}, [studentId]);

	useEffect(() => {
		fetchStudentsDoneWorks();
	}, [studentId]);

	if (isLoading) {
		return (
			<Page>
				<div className={styles.oneStudent__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div className={styles.oneStudent__container}>
				<Paper className={styles.oneStudent__questionBlock}>
					<p className={styles.oneStudent__header}>
						{user?.fullName}
					</p>
				</Paper>
				{works.length === 0 ? (
					<Alert severity="info" variant="outlined">
						<p>У ученика пока нет сданных работ</p>
					</Alert>
				) : (
					<div className={styles.oneStudents__doneWorks__page}>
						{works.map((work: any) => (
							<DoneWorkBage work={work} key={work._id} />
						))}
					</div>
				)}
			</div>
		</Page>
	);
}
