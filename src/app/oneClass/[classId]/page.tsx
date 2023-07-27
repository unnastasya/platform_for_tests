"use client";

import { Page } from "@/components/Page/Page";
import { CircularProgress, Paper } from "@mui/material";
import { useCallback, useEffect } from "react";
import OneClassHeader from "@/components/OneClassHeader/OneClassHeader";
import PeopleListComponent from "@/components/PeopleListComponent/PeopleListComponent";

import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneClassActions,
	oneClassDataSelector,
	oneClassIsLoadingSelector,
	oneClassStudentsSelector,
} from "@/redux/Class/OneClass";

interface OneClassProps {
	params: {
		classId: string;
	};
}

export default function OneClass({ params }: OneClassProps) {
	const dispatch = useAppDispatch();

	const classId = params.classId;

	const classData = useAppSelector(oneClassDataSelector);
	const classStudents = useAppSelector(oneClassStudentsSelector);
	const classIsLoading = useAppSelector(oneClassIsLoadingSelector);

	const changeClassId = () => {
		dispatch(OneClassActions.changeRequestClassId(classId || ""));
	};

	const fetchOneClass = useCallback(() => {
		dispatch(OneClassActions.requestOneClass());
	}, [dispatch]);

	useEffect(() => {
		changeClassId();
		fetchOneClass();
	}, [dispatch, fetchOneClass]);

	if (classIsLoading) {
		return (
			<Page>
				<div className={styles.oneClass__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<Paper className={styles.oneClass__container}>
				<OneClassHeader classData={classData} classId={classId} />
				<PeopleListComponent people={classStudents} />
			</Paper>
		</Page>
	);
}
