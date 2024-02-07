"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { Page } from "@/components/Page/Page";
import { ClassType } from "@/types/class";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	ClassesActions,
	classesDataSelector,
	classesIsLoadingSelector,
} from "@/redux/Class/Classes";
import { AddClassActions } from "@/redux/Class/AddClass";
import { Classes } from "@/components/Classes/Classes";

export default function ClassesPage() {
	const router = useRouter();
	const classes: ClassType[] = useAppSelector(classesDataSelector);
	const classesIsLoading: boolean = useAppSelector(classesIsLoadingSelector);
	const dispatch = useAppDispatch();

	const fetchClasses = useCallback(() => {
		dispatch(ClassesActions.requestClasses());
	}, [dispatch]);

	const navigateToAddClass = () => {
		dispatch(AddClassActions.changeEditClassIdData({}));
		router.push("/addClass");
	};

	useEffect(() => {
		fetchClasses();
	}, [fetchClasses]);

	return (
		<Page>
			<Classes
				isLoading={classesIsLoading}
				classes={classes}
				navigateToAddClass={navigateToAddClass}
			/>
		</Page>
	);
}
