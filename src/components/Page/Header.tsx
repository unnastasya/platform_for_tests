import { Button, Stack } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

import styles from "./Header.module.css";

import { AuthActions, activeUserSelector } from "@/redux/Auth";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const Header = () => {
	const dispatch = useAppDispatch();
	const activeUser = useAppSelector(activeUserSelector);

	const logout = () => {
		dispatch(AuthActions.logout());
	};

	return (
		<div className={styles.header__root}>
			<div className={styles.header__inner}>
				<p className={styles.header__text}>{activeUser.fullName}</p>
				{activeUser.role === "teacher" && (
					<Stack direction="row" spacing={2}>
						<Link href="/lessons" replace>
							<Button
								variant="contained"
								endIcon={<FileCopyIcon />}
							>
								Уроки
							</Button>
						</Link>

						<Link href="/doneWorks" replace>
							<Button variant="contained" endIcon={<TaskIcon />}>
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
						<Link href="/lessons">
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
					variant="outlined"
					endIcon={<LogoutIcon />}
					onClick={() => logout()}
				>
					Выйти
				</Button>
			</div>
		</div>
	);
};

export default Header;
