"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Divider, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionInput from "@/components/QuestionInput/QuestionInput";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";
import { deleteLesson } from "@/api/lessons";
import { Page } from "@/components/Page/Page";
import { DataDoneWork } from "@/types/dataDoneWork";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AddDoneWorkActions,
	addDoneWorkIdSelector,
	addDoneWorkIsAddedSelector,
	addDoneWorkIsLoadingSelector,
} from "@/redux/DoneWork/AddDoneWork";
import {
	OneLessonActions,
	oneLessonDataSelector,
	oneLessonIsLoadingSelector,
} from "@/redux/Lesson/OneLesson";
import { activeUserSelector } from "@/redux/Auth";

import styles from "./page.module.css";

interface OneLessonPageProps {
	params: {
		id: string;
	};
}

export default function OneLessonPage({ params }: OneLessonPageProps) {
	const dispatch = useAppDispatch();

	const id = params.id;
	const router = useRouter();

	const isAddedDoneWork = useAppSelector(addDoneWorkIsAddedSelector);
	const isLoading = useAppSelector(addDoneWorkIsLoadingSelector);
	const doneWorkId = useAppSelector(addDoneWorkIdSelector);

	const lesson = useAppSelector(oneLessonDataSelector);
	const isLoadingLesson = useAppSelector(oneLessonIsLoadingSelector);

	const activeUser = useAppSelector(activeUserSelector);

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
			student: activeUser.userId,
			isVerified: false,
			school: "4 средняя школа",
			class: "9a",
			allCriteriaRating: lesson.allCriteriaRating,
		};

		changeRequestData(data);
		await fetchAddDoneWork();

		if (activeUser.role == "student") {
			router.push(`/reviewDoneWork/${doneWorkId}`);
		} else {
			router.push(`/checkLesson/${doneWorkId}`);
		}
	};

	const onSubmit = (data: any) => {
		addOneDoneWork(data);
	};

	if (isLoading || isLoadingLesson) {
		return (
			<Page>
				<div className={styles.oneLesson__loadingContainer}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	return (
		<Page>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Paper className={styles.oneLesson__infoBlock}>
						{activeUser.role === "teacher" && (
							<div
								className={
									styles.oneLesson__infoBlock_deleteButton
								}
							>
								<Button
									onClick={deleteLessonFunction}
									variant="contained"
									size="small"
								>
									<DeleteIcon />
								</Button>
							</div>
						)}
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
