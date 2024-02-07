"use client";

import { Alert, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

import styles from "./ClassBage.module.css";

import { ClassType } from "@/types/class";

interface ClassBageProps {
	oneClass: ClassType;
}

export default function ClassBage({ oneClass }: ClassBageProps) {
	const router = useRouter();

	const toClassPage = () => {
		router.push(`/oneClass/${oneClass._id}`);
	};

	return (
		<Paper onClick={toClassPage} className={styles.container}>
			<div>
				<p>{oneClass.school}</p>
				<p>{oneClass.class}</p>
			</div>
			<Alert severity="info" icon={false}>
				Учеников: {oneClass.studentsCount}
			</Alert>
		</Paper>
	);
}
