import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import { useAppSelector } from "@/redux/store";
import { activeUserSelector, isAuthUserSelector } from "@/redux/Auth";
import { useRouter } from "next/navigation";

import styles from "./Page.module.css";

export function Page({ children }: any) {
	const user = useAppSelector(activeUserSelector);
	const router = useRouter();
	const isAuthUser = useAppSelector(isAuthUserSelector);

	if (!isAuthUser) {
		router.push(`/login`);
	}

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.page__container}>
				<Header activeUser={user} />
				<div className={styles.page__content}>
					<Container maxWidth="lg">{children}</Container>
				</div>
			</div>
		</ThemeProvider>
	);
}
