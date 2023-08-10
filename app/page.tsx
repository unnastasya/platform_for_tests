"use client";
import { ThemeProvider } from "@emotion/react";
import Link from "next/link";
import { theme } from "../src/theme";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<div className={styles.page__container}>
					<h1>Добро пожаловать на платформу</h1>
					<Link href="/login">
						<Button variant="contained" endIcon={<LoginIcon />}>
							Войти
						</Button>
					</Link>
				</div>
			</ThemeProvider>
		</>
	);
}
