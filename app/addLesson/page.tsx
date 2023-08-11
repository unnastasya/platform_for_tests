"use client";

import { addImage } from "@/api/lessons";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import AddQuestion from "@/components/AddQuestion/AddQuestion";
import { Page } from "@/components/Page/Page";
import { AddLessonHeader } from "@/components/AddLessonHeader/AddLessonHeader";
import { allCriteriaValue } from "@/utils/allCritariaValue";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddLessonActions,
	addLessonIdSelector,
	addLessonIsLoadingSelector,
} from "@/redux/Lesson/AddLesson";

import styles from "./page.module.css";
import { ClassesActions, classesDataSelector } from "@/redux/Class/Classes";

export default function AddLesson() {
	const dispatch = useAppDispatch();

	const classesData = useAppSelector(classesDataSelector);
	const [checkedClass, setCheckedClass] = useState<any[]>([]);

	const isLoading: boolean = useAppSelector(addLessonIsLoadingSelector);

    const fetchClasses = useCallback(() => {
		dispatch(ClassesActions.requestClasses());
	}, []);

	useEffect(() => {
		fetchClasses();
	}, []);

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
			doneCount: 0,
			questions: [
				{
					images: [],
					questionText: "",
					description: "",
					criteria: [{ text: "", value: 0, status: false }],
					criteriaRating: 0,
				},
			],
			allCriteriaRating: 0,
		},
	});

	const router = useRouter();

	const changeRequestData = (data: any) => {
		dispatch(AddLessonActions.changeRequestData(data));
	};

	const fetchAddLesson = useCallback(() => {
		dispatch(AddLessonActions.addLesson());
	}, [dispatch]);

	const getValue = (data: any) => {
		let value = { ...data };
	};

	const onSubmit = async (data: any) => {
		data.allCriteriaRating = allCriteriaValue(data.questions);
		data.classes = checkedClass;
        console.log(data)

		for (
			let questionIndex = 0;
			questionIndex < data.questions.length;
			questionIndex++
		) {
			for (
				let imageIndex = 0;
				imageIndex < data.questions[questionIndex].images.length;
				imageIndex++
			) {
				const imageData = await addImage(
					data.questions[questionIndex].images[imageIndex]
				).then((res) => res);
				data.questions[questionIndex].images[imageIndex] = imageData;
			}
		}

		changeRequestData(data);
		fetchAddLesson();

		router.push("/lessons");
	};

	if (isLoading) {
		return (
			<Page>
				<div className={styles.addLesson__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AddLessonHeader
					register={register}
					setCheckedClass={setCheckedClass}
					checkedClass={checkedClass}
					classesData={classesData}
				/>

				<AddQuestion
					setValue={setValue}
					control={control}
					register={register}
				/>

				<Button
					variant="contained"
					endIcon={<DoneIcon />}
					type="submit"
				>
					Сохранить тестирование
				</Button>
			</form>
		</Page>
	);
}
