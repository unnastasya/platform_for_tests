import { CircularProgress } from "@mui/material";

import { Page } from "../Page/Page";

import styles from "./LoadingBlock.module.css";

export default function LoadingBlock() {
	return (
		<Page>
			<div className={styles.loadingContainer}>
				<CircularProgress />
			</div>
		</Page>
	);
}
