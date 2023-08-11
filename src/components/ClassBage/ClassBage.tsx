"use client";

import { Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { ClassType } from "@/types/class";

import styles from "./ClassBage.module.css";

interface ClassBageProps {
	oneClass: ClassType;
}

export default function ClassBage({ oneClass }: ClassBageProps) {
	const router = useRouter();

	const toClassPage = () => {
		router.push(`/oneClass/${oneClass._id}`);
	};

	return (
		<Paper onClick={toClassPage} className={styles.classBage__container}>
			<p className={styles.classBage__container_textHeader}>
				{oneClass.school}, {oneClass.class}
			</p>
			<p className={styles.classBage__container_studentsCountText}>
				Учеников: {oneClass.studentsCount}{" "}
			</p>
		</Paper>
	);
}
