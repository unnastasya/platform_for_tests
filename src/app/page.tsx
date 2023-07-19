"use client";
import { ThemeProvider } from "@emotion/react";
import Link from "next/link";
import { theme } from "../theme";

export default function Home() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<p>hello, page</p>
				<Link href="/login">Login</Link>
			</ThemeProvider>
		</>
	);
}
