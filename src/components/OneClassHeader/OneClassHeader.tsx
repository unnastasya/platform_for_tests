import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ClassType } from "@/types/class";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { ClassesActions } from "@/redux/Class/Classes";
import { AddClassActions } from "@/redux/Class/AddClass";

import styles from "./OneClassHeader.module.css";

interface OneClassHeaderProps {
	classData: ClassType;
	classId: string;
}

export default function OneClassHeader({
	classData,
	classId,
}: OneClassHeaderProps) {
	const dispatch = useAppDispatch();

	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const router = useRouter();

	const openConfirmDialog = () => {
		setIsConfirmDialogOpen(true);
	};

	const deleteClass = () => {
		dispatch(ClassesActions.changeDeleteClassRequestId(classId));
		dispatch(ClassesActions.deleteClass());
		setIsConfirmDialogOpen(false);
		router.push("/classes");
	};

	const editClass = () => {
		dispatch(
			AddClassActions.changeEditClassIdData({
				classId: classId,
				class: classData,
			})
		);
		router.push("/addClass");
	};

	return (
		<div className={styles.oneClassHeader__container}>
			<p className={styles.oneClassHeader__textHeader}>
				{classData.school}, {classData.class}
			</p>

			<div className={styles.oneClassHeader__buttonsBlock}>
				<Button onClick={editClass} variant="outlined" size="small">
					<EditIcon sx={{ height: "30px", width: "30px" }} />
				</Button>

				<Button
					onClick={openConfirmDialog}
					variant="outlined"
					size="small"
					color="error"
				>
					<DeleteIcon sx={{ height: "30px", width: "30px" }} />
				</Button>
			</div>

			<Dialog
				open={isConfirmDialogOpen}
				onClose={() => setIsConfirmDialogOpen(false)}
			>
				<DialogTitle>Удалить класс</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Вы действительно хотите удалить класс &quot;
						{classData.school} {classData.class}&quot;?
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
						onClick={deleteClass}
						color="error"
					>
						Удалить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
