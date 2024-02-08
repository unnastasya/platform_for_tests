"use client";

import { useCallback, useEffect, useState } from "react";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	OneClassActions,
	oneClassDataSelector,
	oneClassIsLoadingSelector,
} from "@/redux/Class/OneClass";
import { OneClass } from "@/components/OneClass/OneClass";

interface OneClassProps {
	params: {
		classId: string;
	};
}

export default function OneClassPage({ params }: OneClassProps) {
	const dispatch = useAppDispatch();

	const classId = params.classId;

	const classData = useAppSelector(oneClassDataSelector);
	const classStudents = classData.students || [];
	const classIsLoading = useAppSelector(oneClassIsLoadingSelector);
	const [users, setUsers] = useState<any[]>([]);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	const changeClassId = useCallback(() => {
		dispatch(OneClassActions.changeRequestClassId(classId || ""));
	}, [dispatch, classId]);

	const fetchOneClass = useCallback(() => {
		dispatch(OneClassActions.requestOneClass());
	}, [dispatch]);

	useEffect(() => {
		changeClassId();
		fetchOneClass();
	}, [changeClassId, fetchOneClass]);

	return (
		<Page>
			<OneClass
				isLoading={classIsLoading}
				classData={classData}
				classId={classId}
				setUsers={setUsers}
				setIsConfirmDialogOpen={setIsConfirmDialogOpen}
				classStudents={classStudents}
				users={users}
				isConfirmDialogOpen={isConfirmDialogOpen}
			/>
		</Page>
	);
}
