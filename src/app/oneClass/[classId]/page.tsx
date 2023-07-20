"use client";

import { Page } from "@/components/Page/Page";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getOneClass } from "@/api/classes";
import { ClassType } from "@/types/class";
import { getUsersByClassId } from "@/api/auth";
import OneClassHeader from "@/components/OneClassHeader/OneClassHeader";
import { User } from "@/types/user";
import PeopleListComponent from "@/components/PeopleListComponent/PeopleListComponent";

import styles from "./page.module.css";

interface OneClassProps {
	params: {
		classId: string;
	};
}

export default function OneClass({ params }: OneClassProps) {
	const classId = params.classId;
	const [classData, setClass] = useState<ClassType>({
		_id: 0,
		school: "",
		class: "",
		studentsCount: 0,
		lessons: [],
	});
	const [classStudents, setClassStudents] = useState<User[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const classData = await getOneClass(classId);
			setClass(classData);

			const classStudentsData = await getUsersByClassId(classId);
			setClassStudents(classStudentsData);
		};

		fetchData();
	}, [classId]);

	return (
		<Page>
			<Paper className={styles.questionBlock1}>
				<OneClassHeader classData={classData} classId={classId} />
				<PeopleListComponent people={classStudents} />
			</Paper>
		</Page>
	);
}
