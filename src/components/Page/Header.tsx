import { Button, Container, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskIcon from "@mui/icons-material/Task";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PersonIcon from "@mui/icons-material/Person";

import styles from "./Header.module.css";

interface HeaderProps {
	activeUser: any;
}

const Header = ({ activeUser }: HeaderProps) => {
	return (
		<div className={styles.header_root}>
			<Container>
				<div className={styles.header_inner}>
					<p className={styles.header__text}>
						{activeUser.lastName} {activeUser.name}
					</p>
					{activeUser.role === "teacher" && (
						<Stack direction="row" spacing={2}>
							<Button variant="contained" endIcon={<AddIcon />}>
								Добавить урок
							</Button>

							<Button
								variant="contained"
								endIcon={<FileCopyIcon />}
							>
								Все уроки
							</Button>

							<Button variant="contained" endIcon={<TaskIcon />}>
								Сданные работы
							</Button>

							<Button
								variant="contained"
								endIcon={<PeopleIcon />}
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
							>
								Доступные уроки
							</Button>

							<Button
								variant="contained"
								endIcon={<PersonIcon />}
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
