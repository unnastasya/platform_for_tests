"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Page } from "@/components/Page/Page";
import { DataDoneWork } from "@/types/dataDoneWork";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddDoneWorkActions,
	addDoneWorkIsLoadingSelector,
} from "@/redux/DoneWork/AddDoneWork";
import {
	OneLessonActions,
	oneLessonDataSelector,
	oneLessonIsLoadingSelector,
} from "@/redux/Lesson/OneLesson";
import { activeUserSelector } from "@/redux/Auth";
import { LessonsActions } from "@/redux/Lesson/Lessons";
import { AddLessonActions } from "@/redux/Lesson/AddLesson";
import { OneLesson } from "@/components/OneLesson/OneLesson";

interface OneLessonProps {
	params: {
		id: string;
	};
}

export default function OneLessonPage({ params }: OneLessonProps) {
	const dispatch = useAppDispatch();

	const id = params.id;
	const router = useRouter();

	const isLoading = useAppSelector(addDoneWorkIsLoadingSelector);

	const [isAddedDialogOpen, setIsAddedDialogOpen] = useState(false);

	const lesson = useAppSelector(oneLessonDataSelector);
	const isLoadingLesson = useAppSelector(oneLessonIsLoadingSelector);

	const activeUser = useAppSelector(activeUserSelector);

	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	const openConfirmDialog = () => {
		setIsConfirmDialogOpen(true);
	};

	const changeRequestData = (data: any) => {
		dispatch(AddDoneWorkActions.changeRequestData(data));
	};

	const fetchAddDoneWork = useCallback(() => {
		dispatch(AddDoneWorkActions.addDoneWork());
	}, [dispatch]);

	const fetchLesson = useCallback(() => {
		dispatch(OneLessonActions.requestOneLesson());
	}, [dispatch]);

	useEffect(() => {
		dispatch(OneLessonActions.changeRequestLessonId(id));
		fetchLesson();
	}, [dispatch, fetchLesson, id]);

	const deleteLessonFunction = () => {
		dispatch(LessonsActions.changeDeleteLessonRequestId(id));
		dispatch(LessonsActions.deleteLesson());
		setIsConfirmDialogOpen(false);
		router.push("/lessons");
	};

	const { register, handleSubmit } = useForm<DataDoneWork>({
		defaultValues: {
			answers: [],
		},
	});

	const addOneDoneWork = async (data: any) => {
		data = {
			...data,
			lessonId: id,
			student: activeUser.userId,
			isVerified: false,
			allCriteriaRating: lesson.allCriteriaRating,
		};

		changeRequestData(data);
		fetchAddDoneWork();

		setIsAddedDialogOpen(true);
	};

	const onSubmit = (data: any) => {
		addOneDoneWork(data);
	};

	const editLesson = () => {
		dispatch(
			AddLessonActions.changeEditLessonData({
				lessonId: id,
				lesson: lesson,
			})
		);
		router.push("/addLesson");
	};

	const changeLessonVisible = () => {
		dispatch(OneLessonActions.changeVisibleLesson());
	};

	return (
		<Page>
			<OneLesson
				isLoading={isLoading}
				isLoadingLesson={isLoadingLesson}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				lesson={lesson}
				activeUser={activeUser}
				changeLessonVisible={changeLessonVisible}
				editLesson={editLesson}
				openConfirmDialog={openConfirmDialog}
				register={register}
				isConfirmDialogOpen={isConfirmDialogOpen}
				setIsConfirmDialogOpen={setIsConfirmDialogOpen}
				deleteLessonFunction={deleteLessonFunction}
				isAddedDialogOpen={isAddedDialogOpen}
				setIsAddedDialogOpen={setIsAddedDialogOpen}
			/>
		</Page>
	);
}
