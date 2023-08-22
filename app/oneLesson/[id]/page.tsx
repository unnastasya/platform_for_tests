"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Divider, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import QuestionBlock from "@/components/QuestionBlock/QuestionBlock";
import QuestionInput from "@/components/QuestionInput/QuestionInput";
import QuestionCriteria from "@/components/QuestionCriteria/QuestionCriteria";
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
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { LessonsActions } from "@/redux/Lesson/Lessons";
import { AddLessonActions } from "@/redux/Lesson/AddLesson";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./page.module.css";

interface OneLessonProps {
	params: {
		id: string;
	};
}

export default function OneLesson({ params }: OneLessonProps) {
	const dispatch = useAppDispatch();

	const id = params.id;
	const router = useRouter();

	const isAddedDoneWork = useAppSelector(addDoneWorkIsAddedSelector);
	const isLoading = useAppSelector(addDoneWorkIsLoadingSelector);
	const doneWorkId = useAppSelector(addDoneWorkIdSelector);

	const lesson = useAppSelector(oneLessonDataSelector);
	const isLoadingLesson = useAppSelector(oneLessonIsLoadingSelector);

	const activeUser = useAppSelector(activeUserSelector);

	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [isAddedDialogOpen, setIsAddedDialogOpen] = useState(false);

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
	}, [id]);

	const deleteLessonFunction = () => {
		dispatch(LessonsActions.changeDeleteLessonRequestId(id));
		dispatch(LessonsActions.deleteLesson());
		setIsConfirmDialogOpen(false);
		router.push("/lessons");
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
			allCriteriaRating: lesson.allCriteriaRating,
		};

		changeRequestData(data);
		fetchAddDoneWork();

		setIsAddedDialogOpen(true);
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

	const editLesson = () => {
		dispatch(
			AddLessonActions.changeEditLessonData({
				lessonId: id,
				lesson: lesson,
			})
		);
		router.push("/addLesson");
	};

	return (
		<Page>
			<Dialog
				open={isAddedDialogOpen}
				onClose={() => setIsAddedDialogOpen(false)}
			>
				<DialogContent>
					<DialogContentText>Ваша работа принята</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => {
							setIsAddedDialogOpen(false);
							router.push("/myWorks");
						}}
					>
						ОК
					</Button>
				</DialogActions>
			</Dialog>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.oneLesson__container}>
						<Paper className={styles.oneLesson__infoBlock}>
							{activeUser.role === "teacher" && (
								<div
									className={
										styles.oneLesson__infoBlock_buttonsBlock
									}
								>
									<Button
										onClick={editLesson}
										variant="outlined"
										size="small"
									>
										<EditIcon />
									</Button>
									<Button
										onClick={openConfirmDialog}
										variant="outlined"
										size="small"
										color="error"
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
							lesson.questions.map(
								(question: any, index: any) => (
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
								)
							)}
						{activeUser.role === "student" && (
							<Button
								variant="contained"
								endIcon={<AddIcon />}
								type="submit"
							>
								Сдать работу
							</Button>
						)}
					</div>
				</form>
				<Dialog
					open={isConfirmDialogOpen}
					onClose={() => setIsConfirmDialogOpen(false)}
				>
					<DialogTitle>Удалить урок</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Вы действительно хотите удалить урок &quot;
							{lesson.name}
							&quot;?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							onClick={() => setIsConfirmDialogOpen(false)}
						>
							Отмена
						</Button>
						<Button
							variant="outlined"
							onClick={deleteLessonFunction}
							color="error"
						>
							Удалить
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</Page>
	);
}
