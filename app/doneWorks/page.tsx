"use client";

import { useCallback, useEffect } from "react";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	DoneWorksActions,
	doneWorksDataSelector,
	doneWorksIsLoadingSelector,
} from "@/redux/DoneWork/DoneWorks";
import { DoneWorks } from "@/components/DoneWorks/DoneWorks";

export default function DoneWorksPage() {
	const works = useAppSelector(doneWorksDataSelector);
	const worksIsLoading: boolean = useAppSelector(doneWorksIsLoadingSelector);

	const dispatch = useAppDispatch();

	const fetchDoneWorks = useCallback(() => {
		dispatch(DoneWorksActions.requestDoneWorks());
	}, [dispatch]);

	useEffect(() => {
		fetchDoneWorks();
	}, [dispatch, fetchDoneWorks]);

	return (
		<Page>
			<DoneWorks works={works} isLoading={worksIsLoading} />
		</Page>
	);
}
