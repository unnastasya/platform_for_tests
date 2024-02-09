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
					minHeight: "50px",
					borderRadius: "5px",
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					minHeight: "50px",
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					height: "40px",
					fontSize: "16px",
					borderRadius: "10px",
				},
				outlined: {
					height: "40px",
					fontSize: "16px",
					borderRadius: "10px",
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
				},
				outlined: {
					borderColor: "#2979FF",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
				},
			},
		},
        MuiAlert: {
            styleOverrides: {
                root: {
                    boxShadow: "none"
                }
            }
        }
	},
});
