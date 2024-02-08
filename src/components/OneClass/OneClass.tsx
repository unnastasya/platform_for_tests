import { CircularProgress, Paper } from "@mui/material";

import OneClassHeader from "../OneClassHeader/OneClassHeader";
import PeopleListComponent from "../PeopleListComponent/PeopleListComponent";

import styles from "./OneClass.module.css";

export const OneClass = ({
	isLoading,
	classData,
	classId,
	setUsers,
	setIsConfirmDialogOpen,
	classStudents,
	users,
	isConfirmDialogOpen,
}: any) => {
	if (isLoading) {
		return (
			<div className={styles.circular__container}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Paper className={styles.container}>
			<OneClassHeader
				classData={classData}
				classId={classId}
				setUsers={setUsers}
				setIsConfirmDialogOpenUsers={setIsConfirmDialogOpen}
			/>
			<PeopleListComponent
				people={classStudents}
				users={users}
				isConfirmDialogOpen={isConfirmDialogOpen}
				setIsConfirmDialogOpen={setIsConfirmDialogOpen}
			/>
		</Paper>
	);
};
