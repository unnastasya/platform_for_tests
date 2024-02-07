import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import QuestionBlock from "../QuestionBlock/QuestionBlock";
import QuestionInput from "../QuestionInput/QuestionInput";
import QuestionCriteria from "../QuestionCriteria/QuestionCriteria";

import styles from "./OneLesson.module.css";

export const OneLesson = ({
	isLoadingLesson,
	isLoading,
	handleSubmit,
	onSubmit,
	lesson,
	activeUser,
	changeLessonVisible,
	editLesson,
	openConfirmDialog,
	register,
	isConfirmDialogOpen,
	setIsConfirmDialogOpen,
	deleteLessonFunction,
	isAddedDialogOpen,
	setIsAddedDialogOpen,
}: any) => {
	const router = useRouter();

	if (isLoading || isLoadingLesson) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.container}>
						<Paper className={styles.infoBlock}>
							{activeUser.role === "teacher" && (
								<div className={styles.buttonsBlock}>
									<Alert severity="info" icon={false}>
										{lesson.isVisible
											? "Видимый"
											: "Невидимый"}
									</Alert>
									<Button
										onClick={changeLessonVisible}
										variant="outlined"
										size="small"
										sx={
											lesson.isVisible
												? {
													borderColor: "#A4A9AD",
													color: "#A4A9AD",
												  }
												: {}
										}
									>
										{lesson.isVisible
											? "Сделать невидимым"
											: "Сделать видимым"}
									</Button>
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
							<p className={styles.header}>{lesson.name}</p>
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
										<Divider
											sx={{ margin: "15px 0 30px" }}
										/>
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
					open={isAddedDialogOpen}
					onClose={() => setIsAddedDialogOpen(false)}
				>
					<DialogContent sx={{ padding: "30px" }}>
						<DialogContentText>
							Ваша работа принята
						</DialogContentText>
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
				<Dialog
					open={isConfirmDialogOpen}
					onClose={() => setIsConfirmDialogOpen(false)}
				>
					<DialogTitle sx={{ padding: "30px 30px 20px" }}>
						Удалить урок
					</DialogTitle>
					<DialogContent sx={{ padding: "0 30px 20px" }}>
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
		</>
	);
};
