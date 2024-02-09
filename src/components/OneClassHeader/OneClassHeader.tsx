import { useState } from "react";
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

import styles from "./OneClassHeader.module.css";

import { ClassType } from "@/types/class";
import { useAppDispatch } from "@/redux/store";
import { ClassesActions } from "@/redux/Class/Classes";
import { AddClassActions } from "@/redux/Class/AddClass";
import { getClassesUsers } from "@/api/classes";

interface OneClassHeaderProps {
	classData: ClassType;
	classId: string;
	setUsers: any;
	setIsConfirmDialogOpenUsers: any;
}

export default function OneClassHeader({
	classData,
	classId,
	setUsers,
	setIsConfirmDialogOpenUsers,
}: OneClassHeaderProps) {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

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

	const getPasswords = () => {
		getClassesUsers(classId).then((res) => {
			setUsers(res);
		});
		setIsConfirmDialogOpenUsers(true);
	};

	return (
		<div className={styles.container}>
			<p className={styles.header}>
				{classData.school}, {classData.class}
			</p>

			<div className={styles.buttonsBlock}>
				<Alert
					severity="info"
					icon={false}
					sx={{ height: "40px", alignItems: "center" }}
				>
					Учеников: {classData.students?.length}
				</Alert>
				<Button onClick={getPasswords} variant="outlined" size="small">
					Данные учеников
				</Button>
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
				<DialogContent sx={{ padding: "30px" }}>
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
