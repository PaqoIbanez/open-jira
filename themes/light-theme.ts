import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#c4c8cc',
            paper: '#ECEFF4'
        },
        primary: {
            main: '#2E3440',
        },
        secondary: {
            main: '#19857b'
        },
        info: {
            main: '#81A1C1'
        },
        error: {
            main: '#BF616A',
        },
        text: {
            primary: '#2E3440'
        }
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#4C566A'
                }
            },
            defaultProps: {
                elevation: 0
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#ECEFF4"
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(192,97,106,0.8)',
                    },
                }
            }
        }
    }
});