"use client";

import styles from "./page.module.css";
import { Alert, Button, Paper, TextField, ThemeProvider } from "@mui/material";
import { useForm } from "react-hook-form";
import { theme } from "../../theme.js";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function Page() {
	const router = useRouter();
	const [loginError, setLoginError] = useState<string>("");

	const LogiSchema = Yup.object().shape({
		login: Yup.string().required("Пожалуйста, введите логин"),
		password: Yup.string().required("Пожалуйста, введите пароль"),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(LogiSchema),
	});

	const onSubmit = (data: any) => {
		login(data)
			.then((res: any) => {
				if (res.status === 200) {
					router.push("/lessonsPage");
				} else if (res.status === 401) {
					setLoginError(res.errorMessage);
				}
			})
			.catch((error) => {
				setLoginError("Произошла ошибка. Попробуйте еще раз.");
			});
	};
	return (
		<ThemeProvider theme={theme}>
			<div className={styles.login__container}>
				<Paper className={styles.login__block}>
					<form
						className={styles.login__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<h1 className={styles.login__h1}>Войти</h1>

						<TextField
							{...register("login")}
							fullWidth
							multiline
							label="Логин"
							error={!!errors.login?.message}
							helperText={errors.login?.message}
						/>
						<TextField
							{...register("password")}
							fullWidth
							multiline
							label="Пароль"
							error={!!errors.password?.message}
							helperText={errors.password?.message}
						/>

						{loginError && (
							<Alert
								sx={{
									width: "100%",
								}}
								severity="error"
							>
								{loginError}
							</Alert>
						)}
						<Button variant="contained" fullWidth type="submit">
							Войти
						</Button>
					</form>
				</Paper>
			</div>
		</ThemeProvider>
	);
}
