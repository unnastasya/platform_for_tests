"use client";

import { getDoneWorks } from "@/api/doneWorks";
import DoneWorkBage from "@/components/DoneWorkBage/DoneWorkBage";
import { useEffect, useState } from "react";
import { Page } from "@/components/Page/Page";

import styles from "./page.module.css";

export default function DoneWorks() {
	const [works, setWorks] = useState<any[]>([]);

	useEffect(() => {
		getDoneWorks().then((res) => setWorks(res));
	}, []);

	return (
		<Page>
			<div className={styles.doneWorks__page}>
				{works.map((work: any) => (
					<DoneWorkBage work={work} key={work._id} />
				))}
			</div>
		</Page>
	);
}
