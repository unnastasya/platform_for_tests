"use client";

import { Page } from "@/components/Page/Page";
import { CircularProgress, Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import OneClassHeader from "@/components/OneClassHeader/OneClassHeader";
import PeopleListComponent from "@/components/PeopleListComponent/PeopleListComponent";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneClassActions,
	oneClassDataSelector,
	oneClassIsLoadingSelector,
} from "@/redux/Class/OneClass";

import styles from "./page.module.css";

interface OneClassProps {
	params: {
		classId: string;
	};
}

export default function OneClass({ params }: OneClassProps) {
	const dispatch = useAppDispatch();

	const classId = params.classId;

	const classData = useAppSelector(oneClassDataSelector);
	const classStudents = classData.students || [];
	const classIsLoading = useAppSelector(oneClassIsLoadingSelector);
	const [users, setUsers] = useState<any[]>([]);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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
				<OneClassHeader classData={classData} classId={classId} setUsers={setUsers} setIsConfirmDialogOpenUsers={setIsConfirmDialogOpen}/>
				<PeopleListComponent people={classStudents} users={users} isConfirmDialogOpen={isConfirmDialogOpen}  setIsConfirmDialogOpen={setIsConfirmDialogOpen}/>
			</Paper>
		</Page>
	);
}
