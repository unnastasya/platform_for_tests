"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	// shadows: Array(25).fill("none"),
	palette: {
		primary: {
			main: "#2979FF",
		},
	},
	typography: {
		button: {
			textTransform: "none",
			fontWeight: 400,
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					height: "50px",
					borderRadius: "5px",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					height: "50px",
				},
			},
		},
        MuiButton: {
            styleOverrides: {
                root: {
                    height: "50px",
                    fontSize: "16px"
                }
            }
        }
	},
});
