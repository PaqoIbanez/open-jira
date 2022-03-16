import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#242931',
            paper: '#2E3440'
        },
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#19857b'
        },
        info: {
            main: '#8FBCBB'
        },
        error: {
            main: '#BF616A',
        }
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "#242931"
                }
            }
        }
    }
});