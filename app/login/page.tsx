"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { theme } from "../../src/theme.js";
import { LoginSchema } from "../../app/login/LoginSchema";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthActions, isAuthUserSelector } from "@/redux/Auth";
import { Login as LoginCmp } from "@/components/Login/Login";
import { LoginUserType } from "@/types/user";

import {
	hasErrorLoginUserDataSelector,
	isLoadingLoginUserDataSelector,
	loginErrorMessageSelector,
} from "@/redux/Auth";

export default function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const isAuthUser = useAppSelector(isAuthUserSelector);
	const isLoading = useAppSelector(isLoadingLoginUserDataSelector);
	const hasError = useAppSelector(hasErrorLoginUserDataSelector);
	const errorMessage = useAppSelector(loginErrorMessageSelector);

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<LoginUserType>({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(LoginSchema),
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
		dispatch(AuthActions.reset());
	}, []);

	useEffect(() => {
		if (isAuthUser) {
			router.push("/lessons");
		}
	}, [isAuthUser]);

	return (
		<ThemeProvider theme={theme}>
			<LoginCmp
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				control={control}
				errors={errors}
				isLoading={isLoading}
				hasError={hasError}
				errorMessage={errorMessage}
			/>
		</ThemeProvider>
	);
}
