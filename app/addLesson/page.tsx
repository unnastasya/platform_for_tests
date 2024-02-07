"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import addImagesToQuestions from "./utils";
import { LessonSchema } from "./LessonSchema";

import { Page } from "@/components/Page/Page";
import { allCriteriaValue } from "@/utils/allCritariaValue";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddLessonActions,
	addLessonIsLoadingSelector,
	editLessonDataSelector,
	editLessonIdDataSelector,
} from "@/redux/Lesson/AddLesson";
import { ClassesActions, classesDataSelector } from "@/redux/Class/Classes";
import LoadingBlock from "@/components/LoadingBlock/LoadingBlock";
import { activeUserIdSelector } from "@/redux/Auth";
import { AddLesson } from "@/components/AddLesson/AddLesson";

export default function AddLessonPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const activeUserId = useAppSelector(activeUserIdSelector);

	const classesData = useAppSelector(classesDataSelector);

	const isLoading: boolean = useAppSelector(addLessonIsLoadingSelector);

	const editLessonId = useAppSelector(editLessonIdDataSelector || null);
	const editLessonData = useAppSelector(editLessonDataSelector || null);

	const fetchClasses = useCallback(() => {
		dispatch(ClassesActions.requestClasses());
	}, [dispatch]);

	const getClassesForChange = (): any[] => {
		const arr: any[] = [];
		editLessonData?.classes.map((el) => {
			arr.push(el._id);
		});
		return arr;
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm({
		defaultValues: {
			name: editLessonData?.name || "",
			classes: editLessonData ? getClassesForChange() : [],
			doneCount: editLessonData?.doneCount || 0,
			questions: editLessonData?.questions || [
				{
					images: [],
					questionText: "",

					criteria: [{ text: "", value: 0, status: false }],
					criteriaRating: 0,
				},
			],
			allCriteriaRating: editLessonData?.allCriteriaRating || 0,
			authorId: editLessonData?.authorId || activeUserId,
		},
		resolver: yupResolver(LessonSchema),
	});

	const changeRequestData = (data: any) => {
		dispatch(AddLessonActions.changeRequestData(data));
	};

	const fetchAddLesson = useCallback(() => {
		dispatch(AddLessonActions.addLesson());
	}, [dispatch]);

	const onSubmit = async (data: any) => {
		const value = { ...data };
		value.allCriteriaRating = allCriteriaValue(value.questions);

		await addImagesToQuestions(value);

		if (editLessonId) {
			changeRequestData(value);
			dispatch(AddLessonActions.editLesson());
		} else {
			changeRequestData(value);
			fetchAddLesson();
		}

		dispatch(AddLessonActions.changeEditLessonData({}));
		router.push("/lessons");
	};

	useEffect(() => {
		fetchClasses();
	}, [fetchClasses]);

	if (isLoading) {
		return <LoadingBlock />;
	}

	return (
		<Page>
			<AddLesson
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				register={register}
				classesData={classesData}
				errors={errors}
				control={control}
				setValue={setValue}
			/>
		</Page>
	);
}
