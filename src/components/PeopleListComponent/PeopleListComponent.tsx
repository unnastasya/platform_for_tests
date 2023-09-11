import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

import styles from "./PeopleListComponent.module.css";

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
				<DialogContent>
					<DialogContentText>
						{users.map((user) => (
							<div className={styles.userData}>
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
					className={styles.peopleList__oneStusent}
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
