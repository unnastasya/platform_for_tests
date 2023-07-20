"use client";

import { useEffect, useState } from "react";
import { getLessons } from "@/api/lessons";
import OneTestBlock from "@/components/OneTestBlock/OneTestBlock";
import { Page } from "@/components/Page/Page";

import styles from "./page.module.css";

export default function LessonsPage() {
	const [lessons, setLessons] = useState<any[]>([]);

	useEffect(() => {
		getLessons().then((response: any) => setLessons(response));
	}, []);

	return (
		<>
			<Page>
				<div className={styles.lessonsPage__container}>
					{lessons.map((lesson) => (
						<OneTestBlock key={lesson._id} lesson={lesson} />
					))}
				</div>
			</Page>
		</>
	);
}
