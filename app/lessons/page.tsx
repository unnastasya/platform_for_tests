"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Page } from "@/components/Page/Page";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	LessonsActions,
	lessonsDataSelector,
	lessonsIsLoadingSelector,
} from "@/redux/Lesson/Lessons";
import { LessonType } from "@/types/lesson";
import { activeUserSelector } from "@/redux/Auth";
import { AddLessonActions } from "@/redux/Lesson/AddLesson";
import { Lessons } from "@/components/Lessons/Lessons";

export default function LessonsPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const lessons: LessonType[] = useAppSelector(lessonsDataSelector);
	const isLoading: boolean = useAppSelector(lessonsIsLoadingSelector);

	const activeUser = useAppSelector(activeUserSelector);

	const fetchLessons = useCallback(() => {
		if (activeUser.role === "student") {
			dispatch(LessonsActions.requestActiveUsersOpenLessons());
		} else {
			dispatch(LessonsActions.requestLessons());
		}
	}, [activeUser.role]);

	const goToAddLesson = () => {
		dispatch(AddLessonActions.changeEditLessonData({}));
		router.push("/addLesson");
	};

	useEffect(() => {
		fetchLessons();
	}, []);

	return (
		<Page>
			<Lessons
				isLoading={isLoading}
				lessons={lessons}
				activeUser={activeUser}
				goToAddLesson={goToAddLesson}
			/>
		</Page>
	);
}
