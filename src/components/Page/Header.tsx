import { Button, Container, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskIcon from "@mui/icons-material/Task";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthActions, activeUserSelector } from "@/redux/Auth";
import LogoutIcon from "@mui/icons-material/Logout";

import styles from "./Header.module.css";
import Link from "next/link";


const Header = () => {
	const dispatch = useAppDispatch();
    const activeUser = useAppSelector(activeUserSelector);

	const logout = () => {dispatch(AuthActions.logout())};


	return (
		<div className={styles.header__root}>
			<Container>
				<div className={styles.header__inner}>
					<p className={styles.header__text}>{activeUser.fullName}</p>
					{activeUser.role === "teacher" && (
						<Stack direction="row" spacing={2}>
							<Link href="/addLesson">
								<Button
									variant="contained"
									endIcon={<AddIcon />}
								>
									Добавить урок
								</Button>
							</Link>

							<Link href="/lessons" replace>
								<Button
									variant="contained"
									endIcon={<FileCopyIcon />}
								>
									Все уроки
								</Button>
							</Link>

							<Link href="/doneWorks" replace>
								<Button
									variant="contained"
									endIcon={<TaskIcon />}
								>
									Сданные работы
								</Button>
							</Link>

							<Link href="/classes">
								<Button
									variant="contained"
									endIcon={<PeopleIcon />}
								>
									Классы
								</Button>
							</Link>
						</Stack>
					)}
					{activeUser.role === "student" && (
						<Stack direction="row" spacing={2}>
							<Link href="/lessonsPage">
								<Button
									variant="contained"
									endIcon={<InsertDriveFileIcon />}
								>
									Доступные уроки
								</Button>
							</Link>

							<Link href="/myWorks">
								<Button
									variant="contained"
									endIcon={<PersonIcon />}
								>
									Мои работы
								</Button>
							</Link>
						</Stack>
					)}
					<Button
						variant="contained"
						endIcon={<LogoutIcon />}
						onClick={() => logout()}
					>
						Выйти
					</Button>
				</div>
			</Container>
		</div>
	);
};

export default Header;
