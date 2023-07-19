"use client";

import { Paper } from "@mui/material";
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
		<Paper onClick={toClassPage} className={styles.classPage__block}>
			<div className={styles.classPage__block__border} />
			<p className={styles.classPage__text}>{oneClass.school}</p>
			<p className={styles.classPage__text}>{oneClass.class} класс</p>
			<p>Учеников: {oneClass.studentsCount} </p>
		</Paper>
	);
}
