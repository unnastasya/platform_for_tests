import { Button, Container, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskIcon from "@mui/icons-material/Task";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";

import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

interface HeaderProps {
	activeUser: any;
}

const Header = ({ activeUser }: HeaderProps) => {
	const router = useRouter();

	return (
		<div className={styles.header__root}>
			<Container>
				<div className={styles.header__inner}>
					<p className={styles.header__text}>
						{activeUser.lastName} {activeUser.name}
					</p>
					{activeUser.role === "teacher" && (
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								endIcon={<AddIcon />}
								onClick={() => router.push("/addLesson")}
							>
								Добавить урок
							</Button>

							<Button
								variant="contained"
								endIcon={<FileCopyIcon />}
								onClick={() => router.push("/lessonsPage")}
							>
								Все уроки
							</Button>

							<Button
								variant="contained"
								endIcon={<TaskIcon />}
								onClick={() => router.push("/doneWorks")}
							>
								Сданные работы
							</Button>

							<Button
								variant="contained"
								endIcon={<PeopleIcon />}
								onClick={() => router.push("/classes")}
							>
								Классы
							</Button>
						</Stack>
					)}
					{activeUser.role === "student" && (
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								endIcon={<InsertDriveFileIcon />}
								onClick={() => router.push("/lessonsPage")}
							>
								Доступные уроки
							</Button>

							<Button
								variant="contained"
								endIcon={<PersonIcon />}
								onClick={() => router.push("/doneWorks")}
							>
								Мои работы
							</Button>
						</Stack>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Header;
