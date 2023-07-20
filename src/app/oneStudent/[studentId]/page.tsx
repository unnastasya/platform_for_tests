"use client";

import { getOneUser } from "@/api/auth";
import { getOneStudentWorks } from "@/api/doneWorks";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Page } from "@/components/Page/Page";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { User } from "@/types/user";
import { DoneWorkType } from "@/types/doneWork";

import styles from "./page.module.css";

interface OneStudentProps {
	params: {
		studentId: string;
	};
}

export default function OneStudent({ params }: OneStudentProps) {
	const studentId = params.studentId;
	const [works, setWorks] = useState<DoneWorkType[]>([]);
	const [user, setUser] = useState<User>({
		_id: "",
		name: "",
		surname: "",
		role: "student",
	});

	useEffect(() => {
		const fetchData = async () => {
			const studentData = await getOneUser(studentId);
			setUser(studentData);

			const worksData = await getOneStudentWorks(studentId);
			setWorks(worksData);
		};

		fetchData();
	}, [studentId]);

	return (
		<Page>
			<Paper className={styles.oneTest__questionBlock}>
				<p className={styles.oneTest__header}>
					{user.name} {user.surname}
				</p>
			</Paper>
			<div className={styles.doneWorks__page}>
				{works.length === 0 && (
					<Paper className={styles.oneTest__questionBlock}>
						<p>У ученика пока нет сданных работ</p>
					</Paper>
				)}
				{works.map((work: any) => (
					<DoneWorkBage work={work} key={work._id} />
				))}
			</div>
		</Page>
	);
}
