"use client";

import { useEffect, useState } from "react";
import { getOneStudentWorks } from "@/api/doneWorks";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { Page } from "@/components/Page/Page";

import styles from "./page.module.css";

interface MyWorksProps {
	params: {
		studentId: string;
	};
}

export default function MyWorks({ params }: MyWorksProps) {
	const { studentId } = params;
	const [works, setWorks] = useState<any[]>([]);

	useEffect(() => {
		getOneStudentWorks(studentId).then((res) => setWorks(res));
	}, [studentId]);

	return (
		<Page>
			<div className={styles.myWorks__container}>
				{works.map((work: any) => (
					<DoneWorkBage work={work} />
				))}
			</div>
		</Page>
	);
}
