"use client";

import { addLessonToClass } from "@/api/lessons";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import AddQuestion from "@/components/AddQuestion/AddQuestion";
import { Page } from "@/components/Page/Page";
import { AddLessonHeader } from "@/components/AddLessonHeader/AddLessonHeader";
import { allCriteriaValue } from "@/utils/allCritariaValue";
import { ClassType } from "@/types/class";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddLessonActions,
	addLessonIdSelector,
	addLessonIsLoadingSelector,
} from "@/redux/Lesson/AddLesson";

import styles from "./page.module.css";

export default function AddLesson() {
	const dispatch = useAppDispatch();

	const [classesData, setClassesData] = useState<ClassType[]>([]);
	const [checkedClass, setCheckedClass] = useState<any[]>([]);

	const lessonDataId = useAppSelector(addLessonIdSelector);
	const isLoading: boolean = useAppSelector(addLessonIsLoadingSelector);

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
					criteria: [{ text: "", value: 0 }],
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

	const onSubmit = async (data: any) => {
		data.allCriteriaRating = allCriteriaValue(data.questions);
		data.classes = checkedClass;

		changeRequestData(data);
		fetchAddLesson();

		for (const oneClass of checkedClass) {
			addLessonToClass(oneClass._id, { lessonId: lessonDataId });
		}

		router.push("/lessonsPage");
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
					setClassesData={setClassesData}
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
