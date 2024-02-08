import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./PeopleListComponent.module.css";

import { User } from "@/types/user";

interface PeopleListComponentProps {
	people: User[];
	users: any[];
	isConfirmDialogOpen: any;
	setIsConfirmDialogOpen: any;
}

export default function PeopleListComponent({
	people,
	users,
	isConfirmDialogOpen,
	setIsConfirmDialogOpen,
}: PeopleListComponentProps) {
	const router = useRouter();

	const navigateOneStudentPage = (personId: string) => {
		router.push(`/oneStudent/${personId}`);
	};

	return (
		<div>
			<Dialog
				open={isConfirmDialogOpen}
				onClose={() => setIsConfirmDialogOpen(false)}
			>
				<DialogContent sx={{ padding: "30px" }}>
					<DialogContentText>
						{users.map((user) => (
							<div key={user.login} className={styles.userData}>
								<p>{user.fullName}</p>
								<p>{user.login}</p>
								<p>{user.password}</p>
							</div>
						))}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setIsConfirmDialogOpen(false)}
					>
						Закрыть
					</Button>
				</DialogActions>
			</Dialog>
			{people.map((person: User) => (
				<div
					onClick={() => navigateOneStudentPage(person._id)}
					key={person._id}
					className={styles.oneStudent}
				>
					<p>
						{person.name} {person.surname}
					</p>
					<Button variant="outlined">Показать все работы</Button>
				</div>
			))}
		</div>
	);
}
