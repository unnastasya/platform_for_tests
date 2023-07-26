"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Divider, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionInput from "@/components/QuestionInput/QuestionInput";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";
import { deleteLesson, getOneLesson } from "@/api/lessons";
import { addDoneWork } from "@/api/doneWorks";
import { Page } from "@/components/Page/Page";
import { DataDoneWork } from "@/types/dataDoneWork";

import styles from "./page.module.css";

interface OneLessonPageProps {
	params: {
		id: string;
	};
}

export default function OneLessonPage({ params }: OneLessonPageProps) {
	const id = params.id;
	const router = useRouter();
	const [lesson, setLesson] = useState<any>({});

	useEffect(() => {
		const fetchData = async () => {
			const data = await getOneLesson(id);
			setLesson(data);
		};

		fetchData();
	}, [id]);

	const deleteLessonFunction = () => {
		const answer = window.confirm(
			`Вы действительно хотите удалить тестирование "${lesson.name}"?`
		);
		if (answer) {
			deleteLesson(id);
			router.push("/lessonsPage");
		}
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<DataDoneWork>({
		defaultValues: {
			answers: [],
		},
	});

	const addOneDoneWork = async (data: any) => {
		data = {
			...data,
			lessonId: id,
			student: "64aff81d9313c2a053c6b321",
			isVerified: false,
			school: "4 средняя школа",
			class: "9a",
			allCriteriaRating: lesson.allCriteriaRating,
		};

		const doneWorkId = await addDoneWork(data);
		router.push(`/checkLesson/${doneWorkId.id}`);
	};

	const onSubmit = (data: any) => {
		addOneDoneWork(data);
	};

	return (
		<Page>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Paper className={styles.oneLesson__infoBlock}>
						<div
							className={styles.oneLesson__infoBlock_deleteButton}
						>
							<Button
								onClick={deleteLessonFunction}
								variant="contained"
								size="small"
							>
								<DeleteIcon />
							</Button>
						</div>
						<h1 className={styles.oneLesson__infoBlock_header}>
							{lesson.name}
						</h1>
						<p>{lesson.description}</p>
					</Paper>
					{lesson.questions &&
						lesson.questions.map((question: any, index: any) => (
							<QuestionBlock
								index={index}
								key={question._id}
								question={question}
							>
								<QuestionInput
									index={index}
									register={register}
								/>
								<Divider />
								<QuestionCriteria question={question} />
							</QuestionBlock>
						))}
					<Button
						variant="contained"
						endIcon={<AddIcon />}
						type="submit"
					>
						Сдать работу
					</Button>
				</form>
			</div>
		</Page>
	);
}
