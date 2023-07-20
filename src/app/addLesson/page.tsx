"use client";

import { addLesson, addLessonToClass } from "@/api/lessons";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import AddQuestion from "@/components/AddQuestion/AddQuestion";
import { Page } from "@/components/Page/Page";
import { AddLessonHeader } from "@/components/AddLessonHeader/AddLessonHeader";
import { allCriteriaValue } from "@/utils/allCritariaValue";
import { ClassType } from "@/types/class";

export default function AddLesson() {
	const [classesData, setClassesData] = useState<ClassType[]>([]);
	const [checkedClass, setCheckedClass] = useState<any[]>([]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		defaultValues: {
			name: "",
			description: "",
			doneCount: 0,
			questions: [
				{
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

	const onSubmit = async (data: any) => {
		data.allCriteriaRating = allCriteriaValue(data.questions);
		data.classes = classesData;

		const lessonDataId = await addLesson(data);

		for (const oneClass of checkedClass) {
			addLessonToClass(oneClass._id, { lessonId: lessonDataId });
		}

		router.push("/lessonsPage");
	};

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

				<AddQuestion control={control} register={register} />

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
