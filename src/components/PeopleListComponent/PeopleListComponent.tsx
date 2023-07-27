import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

import styles from "./PeopleListComponent.module.css";

interface PeopleListComponentProps {
	people: User[];
}

export default function PeopleListComponent({
	people,
}: PeopleListComponentProps) {
	const router = useRouter();

	const navigateOneStudentPage = (personId: string) => {
		router.push(`/oneStudent/${personId}`);
	};

	return (
		<div>
			{people.map((person: User) => (
				<div key={person._id} className={styles.peopleList__oneStusent}>
					<p>
						{person.name} {person.surname}
					</p>
					<Button
						onClick={() => navigateOneStudentPage(person._id)}
						variant="contained"
					>
						Показать все работы
					</Button>
				</div>
			))}
		</div>
	);
}
