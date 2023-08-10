"use client";

import { CircularProgress, Paper } from "@mui/material";
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
	const studentId = params.studentId;
	const dispatch = useAppDispatch();
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
			<Paper className={styles.oneStudent__questionBlock}>
				<p className={styles.oneStudent__header}>{user?.fullName}</p>
			</Paper>
			<div className={styles.oneStudents__doneWorks__page}>
				{works.length === 0 && (
					<Paper className={styles.oneStudent__questionBlock}>
						<p>У ученика пока нет сданных работ</p>
					</Paper>
				)}
				{works.map((work: any) => (
					<DoneWorkBage work={work} key={work._id} />
				))}
			</div>
		</Page>
	);
}
