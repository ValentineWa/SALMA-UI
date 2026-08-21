import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// ============================================================
// SALMA DESIGN TOKENS
// ============================================================

export const tokens = (mode) => ({
    grey: {
        50: "#FAFAFB",
        100: "#F6F6F8",
        200: "#EEEEF2",
        300: "#E2E2E8",
        400: "#C8C8D0",
        500: "#9999A3",
        600: "#777780",
        700: "#55555D",
        800: "#333339",
        900: "#25252A",
    },

    // ==========================================================
    // SALMA BRAND COLORS
    // ==========================================================

    primary: {
        50: "#FFF8FA",
        100: "#F5BDD3",
        200: "#F5BDD3",
        300: "#F5BDD3",
        400: "#D94A7A",
        500: "#ba1d5b", // SALMA PINK
        600: "#B80049", // DARK PINK
        700: "#B80049",
        800: "#8F0039",
        900: "#6D002B",
    },

    // ==========================================================
    // SUCCESS
    // ==========================================================

    greenAccent: {
        50: "#F1FBF6",
        100: "#DDF5E9",
        200: "#BCEBD4",
        300: "#8DDDB5",
        400: "#56C98C",
        500: "#22A06B",
        600: "#178557",
        700: "#116A46",
        800: "#0C5036",
        900: "#083B28",
    },

    // ==========================================================
    // ERROR
    // ==========================================================

    redAccent: {
        50: "#FFF5F5",
        100: "#FDE8E8",
        200: "#FACACA",
        300: "#F3A3A3",
        400: "#E97878",
        500: "#D64545",
        600: "#B83232",
        700: "#962929",
        800: "#762323",
        900: "#5C1E1E",
    },

    // ==========================================================
    // INFO
    // ==========================================================

    blueAccent: {
        50: "#F5F8FF",
        100: "#E9EFFF",
        200: "#D0DCFF",
        300: "#A9BEFF",
        400: "#7899FF",
        500: "#4D7CFE",
        600: "#3864DB",
        700: "#2D50B0",
        800: "#263F88",
        900: "#22366E",
    },

    // ==========================================================
    // WARNING
    // ==========================================================

    yellowAccent: {
        50: "#FFFBF2",
        100: "#FFF3D6",
        200: "#FFE4A8",
        300: "#FFD274",
        400: "#F7BC45",
        500: "#E5A11A",
        600: "#C88612",
        700: "#A66D0F",
        800: "#865811",
        900: "#704A12",
    },
});


// ============================================================
// MUI THEME SETTINGS
// ============================================================

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode,

            // --------------------------------------------------------
            // SALMA BRAND
            // --------------------------------------------------------

            primary: {
                main: colors.primary[500],
                light: colors.primary[100],
                dark: colors.primary[600],
                contrastText: "#FFFFFF",
            },

            secondary: {
                main: colors.primary[500],
                light: colors.primary[100],
                dark: colors.primary[600],
                contrastText: "#FFFFFF",
            },

            // --------------------------------------------------------
            // STATUS COLORS
            // --------------------------------------------------------

            success: {
                main: colors.greenAccent[500],
                light: colors.greenAccent[100],
                dark: colors.greenAccent[600],
                contrastText: "#FFFFFF",
            },

            error: {
                main: colors.redAccent[500],
                light: colors.redAccent[100],
                dark: colors.redAccent[600],
                contrastText: "#FFFFFF",
            },

            warning: {
                main: colors.yellowAccent[500],
                light: colors.yellowAccent[100],
                dark: colors.yellowAccent[600],
                contrastText: "#FFFFFF",
            },

            info: {
                main: colors.blueAccent[500],
                light: colors.blueAccent[100],
                dark: colors.blueAccent[600],
                contrastText: "#FFFFFF",
            },

            // --------------------------------------------------------
            // NEUTRAL
            // --------------------------------------------------------

            neutral: {
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[300],
            },

            // --------------------------------------------------------
            // BACKGROUND
            // --------------------------------------------------------

            background:
                mode === "dark"
                    ? {
                        default: "#1F1F24",
                        paper: "#29292F",
                    }
                    : {
                        default: "#F7F7F9",
                        paper: "#FFFFFF",
                    },

            // --------------------------------------------------------
            // TEXT
            // --------------------------------------------------------

            text:
                mode === "dark"
                    ? {
                        primary: "#FFFFFF",
                        secondary: "#C8C8D0",
                    }
                    : {
                        primary: "#25252A",
                        secondary: "#777780",
                    },

            divider:
                mode === "dark"
                    ? "#3A3A42"
                    : "#EEEEF2",
        },


        // ==========================================================
        // TYPOGRAPHY
        // ==========================================================

        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),

            fontSize: 12,

            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
                fontWeight: 600,
            },

            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
                fontWeight: 600,
            },

            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
                fontWeight: 600,
            },

            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
                fontWeight: 600,
            },

            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
                fontWeight: 600,
            },

            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
                fontWeight: 600,
            },

            body1: {
                fontSize: 14,
            },

            body2: {
                fontSize: 13,
            },

            button: {
                textTransform: "none",
                fontWeight: 600,
            },
        },


        // ==========================================================
        // SHAPE
        // ==========================================================

        shape: {
            borderRadius: 8,
        },


        // ==========================================================
        // COMPONENT OVERRIDES
        // ==========================================================

        components: {

            // --------------------------------------------------------
            // BUTTONS
            // --------------------------------------------------------

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 7,
                        textTransform: "none",
                        boxShadow: "none",
                        padding: "9px 18px",
                        fontWeight: 600,

                        "&:hover": {
                            boxShadow: "none",
                        },
                    },

                    containedPrimary: {
                        backgroundColor: "#B80049",

                        "&:hover": {
                            backgroundColor: "#B80049",
                        },
                    },

                    outlinedPrimary: {
                        borderColor: "#B80049",
                        color: "#B80049",

                        "&:hover": {
                            borderColor: "#B80049",
                            backgroundColor: "#FFF8FA",
                        },
                    },

                    textPrimary: {
                        color: "#B80049",

                        "&:hover": {
                            backgroundColor: "#F5BDD3",
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // CARDS
            // --------------------------------------------------------

            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor:
                            mode === "dark"
                                ? "#29292F"
                                : "#FFFFFF",

                        borderRadius: 10,

                        border:
                            mode === "dark"
                                ? "1px solid #3A3A42"
                                : "1px solid #EEEEF2",

                        boxShadow:
                            mode === "dark"
                                ? "0 2px 8px rgba(0,0,0,0.20)"
                                : "0 2px 8px rgba(30,30,50,0.04)",
                    },
                },
            },


            // --------------------------------------------------------
            // PAPER
            // --------------------------------------------------------

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                    },
                },
            },


            // --------------------------------------------------------
            // TEXT FIELDS
            // --------------------------------------------------------

            MuiTextField: {
                defaultProps: {
                    variant: "outlined",
                },

                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 7,

                            "& fieldset": {
                                borderColor:
                                    mode === "dark"
                                        ? "#4A4A52"
                                        : "#E2E2E8",
                            },

                            "&:hover fieldset": {
                                borderColor: "#F5BDD3",
                            },

                            "&.Mui-focused fieldset": {
                                borderColor: "#B80049",
                            },
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // INPUT LABEL
            // --------------------------------------------------------

            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color:
                            mode === "dark"
                                ? "#C8C8D0"
                                : "#777780",

                        "&.Mui-focused": {
                            color: "#B80049",
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // SELECT
            // --------------------------------------------------------

            MuiSelect: {
                styleOverrides: {
                    root: {
                        borderRadius: 7,
                    },
                },
            },


            // --------------------------------------------------------
            // CHIPS
            // --------------------------------------------------------

            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        fontWeight: 600,
                    },

                    colorPrimary: {
                        backgroundColor: "#F5BDD3",
                        color: "#B80049",
                    },
                },
            },


            // --------------------------------------------------------
            // DATA GRID
            // --------------------------------------------------------

            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        border:
                            mode === "dark"
                                ? "1px solid #3A3A42"
                                : "1px solid #EEEEF2",

                        borderRadius: 10,

                        backgroundColor:
                            mode === "dark"
                                ? "#29292F"
                                : "#FFFFFF",

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor:
                                mode === "dark"
                                    ? "#333339"
                                    : "#FAFAFB",

                            borderBottom:
                                mode === "dark"
                                    ? "1px solid #44444C"
                                    : "1px solid #EEEEF2",

                            fontWeight: 600,
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom:
                                mode === "dark"
                                    ? "1px solid #35353C"
                                    : "1px solid #F0F0F3",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor:
                                mode === "dark"
                                    ? "rgba(184,0,73,0.08)"
                                    : "rgba(184,0,73,0.035)",
                        },

                        "& .MuiDataGrid-footerContainer": {
                            borderTop:
                                mode === "dark"
                                    ? "1px solid #44444C"
                                    : "1px solid #EEEEF2",
                        },

                        "& .MuiDataGrid-cell:focus": {
                            outline: "none",
                        },

                        "& .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // MENU
            // --------------------------------------------------------

            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                        margin: "2px 6px",

                        "&:hover": {
                            backgroundColor:
                                mode === "dark"
                                    ? "rgba(184,0,73,0.12)"
                                    : "#FFF8FA",
                        },

                        "&.Mui-selected": {
                            backgroundColor: "#F5BDD3",
                            color: "#B80049",

                            "&:hover": {
                                backgroundColor: "#F5BDD3",
                            },
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // DIALOG
            // --------------------------------------------------------

            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 12,

                        backgroundColor:
                            mode === "dark"
                                ? "#29292F"
                                : "#FFFFFF",
                    },
                },
            },


            // --------------------------------------------------------
            // TABS
            // --------------------------------------------------------

            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 600,

                        "&.Mui-selected": {
                            color: "#B80049",
                        },
                    },
                },
            },

            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: "#B80049",
                    },
                },
            },


            // --------------------------------------------------------
            // CHECKBOX
            // --------------------------------------------------------

            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: "#C8C8D0",

                        "&.Mui-checked": {
                            color: "#B80049",
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // RADIO
            // --------------------------------------------------------

            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: "#C8C8D0",

                        "&.Mui-checked": {
                            color: "#B80049",
                        },
                    },
                },
            },


            // --------------------------------------------------------
            // SWITCH
            // --------------------------------------------------------

            MuiSwitch: {
                styleOverrides: {
                    switchBase: {
                        "&.Mui-checked": {
                            color: "#B80049",

                            "& + .MuiSwitch-track": {
                                backgroundColor: "#F5BDD3",
                                opacity: 1,
                            },
                        },
                    },
                },
            },
        },
    };
};


// ============================================================
// COLOR MODE CONTEXT
// ============================================================

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});


// ============================================================
// THEME HOOK
// ============================================================

export const useMode = () => {
    // SALMA starts in LIGHT mode
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) =>
                    prev === "light" ? "dark" : "light"
                ),
        }),
        []
    );

    const theme = useMemo(
        () => createTheme(themeSettings(mode)),
        [mode]
    );

    return [theme, colorMode];
};