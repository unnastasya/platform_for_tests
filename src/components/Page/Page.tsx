import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";

import styles from "./Page.module.css";

const user = {
	id: "64b4f8e069e2dae2470ff33d",
	name: "Анастасия",
	lastName: "Прокопьева",
	role: "teacher",
};

export function Page({ children }: any) {
	return (
		<ThemeProvider theme={theme}>
			<div className={styles.page}>
				<Header activeUser={user} />
				<div className={styles.page_content}>
					<Container maxWidth="lg">{children}</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}
