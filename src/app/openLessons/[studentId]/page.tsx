"use client";

import { Page } from "@/components/Page/Page";
import { useEffect, useState } from "react";
import { getOneStudentLessons } from "@/api/lessons";
import OneTestBlock from "@/components/OneTestBlock/OneTestBlock";

import styles from "./page.module.css";

interface OneStudentProps {
	params: {
		studentId: string;
	};
}

export default function OpenLessons({ params }: OneStudentProps) {
	const { studentId } = params;
	const [works, setWorks] = useState<any[]>([]);

	useEffect(() => {
		getOneStudentLessons(studentId).then((res) => setWorks(res));
	}, []);
	return (
		<Page>
			<div className={styles.openLessosns__container}>
				{works.map((lesson) => (
					<OneTestBlock key={lesson.id} lesson={lesson} />
				))}
			</div>
		</Page>
	);
}
