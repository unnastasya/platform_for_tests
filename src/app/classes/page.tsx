"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getClasses } from "@/api/classes";
import AddIcon from "@mui/icons-material/Add";
import ClassBage from "@/components/ClassBage/ClassBage";
import { Page } from "@/components/Page/Page";
import { ClassType } from "@/types/class";

import styles from "./page.module.css";

export default function Classes() {
	const router = useRouter();
	const [classes, setClasses] = useState<ClassType[]>([]);

	useEffect(() => {
		getClasses().then((response) => setClasses(response));
	}, []);

	const navigateToAddClass = () => {
		router.push("/addClass");
	};
	return (
		<Page>
			<div className={styles.classes_conteiner}>
				<Button
					variant="contained"
					onClick={navigateToAddClass}
					endIcon={<AddIcon />}
				>
					Добавить класс
				</Button>
				<div className={styles.classesPage}>
					{classes.map((oneClass: ClassType) => (
						<ClassBage key={oneClass._id} oneClass={oneClass} />
					))}
				</div>
			</div>
		</Page>
	);
}