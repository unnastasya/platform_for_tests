import {
	Alert,
	Button,
	CircularProgress,
	Paper,
	TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

import { PasswordField } from "./PasswordField";
import styles from "./Login.module.css";

export function Login({
	handleSubmit,
	onSubmit,
	control,
	errors,
	isLoading,
	hasError,
	errorMessage,
}: any) {
	return (
		<div className={styles.container}>
			<Paper className={styles.block}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<p className={styles.header}>Войти</p>

					<Controller
						name="login"
						control={control}
						render={({ field }) => (
							<TextField
								sx={{marginBottom: "20px"}}
								fullWidth
								label="Логин"
								variant="standard"
								error={!!errors.login?.message}
								helperText={errors.login?.message}
								{...field}
							/>
						)}
					/>
					<PasswordField control={control} errors={errors} />

					{isLoading && (
						<CircularProgress className={styles.circular} />
					)}

					{hasError && (
						<Alert className={styles.alert} severity="error">
							{errorMessage}
						</Alert>
					)}

					<Button variant="outlined" fullWidth type="submit">
						Войти
					</Button>
				</form>
			</Paper>
		</div>
	);
}
