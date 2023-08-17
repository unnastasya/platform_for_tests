import { store } from "../src/redux/store";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { StoreProvider } from "../src/redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Тестирование учеников",
	description: "Платформа для тестирования учеников школ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
