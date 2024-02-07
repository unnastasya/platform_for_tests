import {
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import styles from "./Login.module.css";

export const PasswordField = ({ control, errors }: any) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () =>
		setShowPassword((show: boolean) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<Controller
			name="password"
			control={control}
			render={({ field }) => (
				<FormControl
					className={styles.passwordField}
					fullWidth
					variant="standard"
				>
					<InputLabel
						error={!!errors.password?.message}
						htmlFor="standard-adornment-password"
					>
						Пароль
					</InputLabel>
					<Input
						id="standard-adornment-password"
						type={showPassword ? "text" : "password"}
						fullWidth
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
						error={!!errors.password?.message}
						{...field}
					/>
					<FormHelperText error={!!errors.password?.message}>
						{errors.password?.message}
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
};
