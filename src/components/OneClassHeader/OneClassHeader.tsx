import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { ClassType } from "@/types/class";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./OneClassHeader.module.css";
import { useAppDispatch } from "@/redux/store";
import { ClassesActions } from "@/redux/Class/Classes";

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

	return (
		<div className={styles.oneClassHeader__container}>
			<p className={styles.oneClassHeader__textHeader}>
				{classData.school}, {classData.class}
			</p>

			<Button
				onClick={openConfirmDialog}
				variant="contained"
				size="small"
			>
				<DeleteIcon sx={{ height: "30px", width: "30px" }} />
			</Button>

			<Dialog
				open={isConfirmDialogOpen}
				onClose={() => setIsConfirmDialogOpen(false)}
			>
				<DialogTitle>Удалить класс</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Вы действительно хотите удалить класс "
						{classData.school} {classData.class}"?
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
