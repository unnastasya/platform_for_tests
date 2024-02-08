"use client";

import { useCallback, useEffect } from "react";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
	openUserSelector,
} from "@/redux/DoneWork/DoneWorks";
import { OneStudent } from "@/components/OneStudent/OneStudent";

interface OneStudentProps {
	params: {
		studentId: string;
	};
}

export default function OneStudentPage({ params }: OneStudentProps) {
	const dispatch = useAppDispatch();
	const studentId = params.studentId;
	const works = useAppSelector(doneWorksDataSelector);
	const user = useAppSelector(openUserSelector);
	const isLoading = useAppSelector(doneWorksIsLoadingSelector);

	const fetchStudentsDoneWorks = useCallback(() => {
		dispatch(DoneWorksActions.changeRequestIdData(studentId));
		dispatch(DoneWorksActions.requesOneUsersDoneWorks());
	}, [dispatch, studentId]);

	useEffect(() => {
		fetchStudentsDoneWorks();
	}, [fetchStudentsDoneWorks]);

	return (
		<Page>
			<OneStudent isLoading={isLoading} user={user} works={works} />
		</Page>
	);
}
