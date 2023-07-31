"use client";

import styles from "./page.module.css";
import {
	Alert,
	Button,
	CircularProgress,
	Paper,
	TextField,
	ThemeProvider,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { theme } from "../../theme.js";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
	AuthActions,
	hasErrorLoginUserDataSelector,
	isAuthUserSelector,
	isLoadingLoginUserDataSelector,
	loginErrorMessageSelector,
} from "@/redux/Auth";
import { LoginUserType } from "@/types/user";

export default function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const isAuthUser = useAppSelector(isAuthUserSelector);
	const isLoading = useAppSelector(isLoadingLoginUserDataSelector);

	const hasError = useAppSelector(hasErrorLoginUserDataSelector);
	const errorMessage = useAppSelector(loginErrorMessageSelector);

	const LogiSchema = Yup.object().shape({
		login: Yup.string().required("Пожалуйста, введите логин"),
		password: Yup.string().required("Пожалуйста, введите пароль"),
	});

	useEffect(() => {
		dispatch(AuthActions.reset());
	}, []);

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<LoginUserType>({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(LogiSchema),
	});

	const onSubmit = (data: any) => {
		try {
			const value = { ...data };
			dispatch(AuthActions.changeRequestLoginData(value));
			dispatch(AuthActions.requestLogin());
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	useEffect(() => {
		if (isAuthUser) {
			router.push("/lessonsPage");
		}
	}, [isAuthUser]);

	if (isLoading) {
		<ThemeProvider theme={theme}>
			<div className={styles.login__container}>
				<Paper className={styles.login__block}>
					<CircularProgress />
				</Paper>
			</div>
		</ThemeProvider>;
	}

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.login__container}>
				<Paper className={styles.login__block}>
					<form
						className={styles.login__form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<h1 className={styles.login__h1}>Войти</h1>

						<Controller
							name="login"
							control={control}
							render={({ field }) => (
								<TextField
									fullWidth
									label="Логин"
									error={!!errors.login?.message}
									helperText={errors.login?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									fullWidth
									label="Пароль"
									error={!!errors.password?.message}
									helperText={errors.password?.message}
									{...field}
								/>
							)}
						/>

						{hasError && (
							<Alert
								sx={{
									width: "100%",
								}}
								severity="error"
							>
								{errorMessage}
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
