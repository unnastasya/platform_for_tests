"use client";

import { Button } from "@mui/material";
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
	addLessonIsLoadingSelector,
	editLessonDataSelector,
	editLessonIdDataSelector,
} from "@/redux/Lesson/AddLesson";
import { ClassesActions, classesDataSelector } from "@/redux/Class/Classes";
import LoadingBlock from "@/components/LoadingBlock/LoadingBlock";
import addImagesToQuestions from "./utils";

import styles from "./page.module.css";


export default function AddLesson() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const classesData = useAppSelector(classesDataSelector);
	const [checkedClass, setCheckedClass] = useState<any[]>([]);

	const isLoading: boolean = useAppSelector(addLessonIsLoadingSelector);

	const editLessonId = useAppSelector(editLessonIdDataSelector || null);
	const editLessonData = useAppSelector(editLessonDataSelector || null);

	console.log("editLessonData", editLessonData);

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
			name: editLessonData?.name || "",
			description: editLessonData?.description || "",
			doneCount: editLessonData?.doneCount || 0,
			questions: editLessonData?.questions || [
				{
					images: [],
					questionText: "",
					description: "",
					criteria: [{ text: "", value: 0, status: false }],
					criteriaRating: 0,
				},
			],
			allCriteriaRating: editLessonData?.allCriteriaRating || 0,
		},
	});

	const changeRequestData = (data: any) => {
		dispatch(AddLessonActions.changeRequestData(data));
	};

	const fetchAddLesson = useCallback(() => {
		dispatch(AddLessonActions.addLesson());
	}, [dispatch]);

	const onSubmit = async (data: any) => {
		let value = { ...data };
		value.allCriteriaRating = allCriteriaValue(value.questions);
		value.classes = checkedClass;

		console.log("value", value);

		await addImagesToQuestions(value);

		if (editLessonId) {
			changeRequestData(value);
			dispatch(AddLessonActions.editLesson());
		} else {
			changeRequestData(value);
			fetchAddLesson();
		}

		// changeRequestData(data);
		// fetchAddLesson();
		dispatch(AddLessonActions.changeEditLessonData({}));
		router.push("/lessons");
	};

	if (isLoading) {
		return <LoadingBlock />;
	}

	return (
		<Page>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.addLesson__container}>
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
				</div>
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
