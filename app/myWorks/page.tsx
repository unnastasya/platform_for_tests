"use client";

import { useCallback, useEffect } from "react";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
} from "@/redux/DoneWork/DoneWorks";

import { MyWorks } from "@/components/MyWorks/MyWorks";

export default function MyWorksPage() {
	const dispatch = useAppDispatch();

	const works = useAppSelector(doneWorksDataSelector);
	const isLoading = useAppSelector(doneWorksIsLoadingSelector);

	const fetchWorks = useCallback(() => {
		dispatch(DoneWorksActions.requestActiveUsersDoneWorks());
	}, [dispatch]);

	useEffect(() => {
		fetchWorks();
	}, [fetchWorks]);

	return (
		<Page>
			<MyWorks isLoading={isLoading} works={works} />
		</Page>
	);
}
