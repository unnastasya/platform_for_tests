"use client";

import React, { useEffect } from "react";
import { Container } from "@mui/material";
// import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";
import { useAppSelector } from "@/redux/store";
import { isAuthUserSelector } from "@/redux/Auth";
import { useRouter } from "next/navigation";

import styles from "./Page.module.css";
import dynamic from "next/dynamic";
import Header from "./Header";

export function Page({ children }: any) {
	const router = useRouter();
	const isAuthUser = useAppSelector(isAuthUserSelector);

	useEffect(() => {
		if (!isAuthUser) {
			router.push(`/login`);
		}
	}, [isAuthUser]);

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.page__container}>
				<Header />
				<div className={styles.page__content}>{children}</div>
			</div>
		</ThemeProvider>
	);
}
