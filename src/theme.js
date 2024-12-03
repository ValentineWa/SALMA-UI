import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


// color design tokens
export const tokens = (mode) => ({
    ...(mode === "dark"
    ? {

            grey: {
                50: "#f7f7f7",
                100: "#f0f0f0",
                200: "#d9d9d9",
                300: "#c2c2c2",
                400: "#949494",
                500: "#666666",
                600: "#5c0909",
                700: "#3d1818",
                800: "#2e1919",
                900: "#1f1515",
                950: "#0f0d0d",
                },
            primary: {
                50: "#edf0f5",
                100: "#dde1eb",
                200: "#afb8cc",
                300: "#8590ab",
                400: "#434f6e",
                500: "#141b2d",
                600: "#020d29",
                700: "#050c1c",
                800: "#050914",
                900: "#04060d",
                950: "#030408",
            },
            greenAccent: {
                50: "#f5fcfa",
                100: "#ebfaf6",
                200: "#cbf2e8",
                300: "#b0ebdb",
                400: "#7cdec4",
                500: "#4cceac",
                600: "#07ba8a",
                700: "#137d61",
                800: "#125c48",
                900: "#103d31",
                950: "#091f19",
            },
            redAccent: {
                50: "#fcf5f5",
                100: "#fcebeb",
                200: "#f7cfcd",
                300: "#f0b3b1",
                400: "#e67f7c",
                500: "#db4f4a",
                600: "#c40c06",
                700: "#851613",
                800: "#631613",
                900: "#421210",
                950: "#210a0a",
            },
            blueAccent: {
                50: "#f7f8ff",
                100: "#f0f0ff",
                200: "#d9dbff",
                300: "#c2c5fc",
                400: "#959afc",
                500: "#6870fa",
                600: "#0914e0",
                700: "#1a2096",
                800: "#1a1e70",
                900: "#15184a",
                950: "#0e0f26",
            },
        }
        :
{

    grey: {
            950: "#f7f7f7",
            900: "#f0f0f0",
            800: "#d9d9d9",
            700: "#c2c2c2",
            600: "#949494",
            500: "#666666",
            400: "#5c0909",
            300: "#3d1818",
            200: "#2e1919",
            100: "#1f1515",
            50: "#0f0d0d",
    },
    primary: {
            950: "#edf0f5",
            900: "#dde1eb",
            800: "#afb8cc",
            700: "#8590ab",
            600: "#434f6e",
            500: "#141b2d",
            400: "#020d29",
            300: "#050c1c",
            200: "#050914",
            100: "#04060d",
            50: "#030408",
    },
    greenAccent: {
            950: "#f5fcfa",
            900: "#ebfaf6",
            800: "#cbf2e8",
            700: "#b0ebdb",
            600: "#7cdec4",
            500: "#4cceac",
            400: "#07ba8a",
            300: "#137d61",
            200: "#125c48",
            100: "#103d31",
            50: "#091f19",
    },
    redAccent: {
            950: "#fcf5f5",
            900: "#fcebeb",
            800: "#f7cfcd",
            700: "#f0b3b1",
            600: "#e67f7c",
            500: "#db4f4a",
            400: "#c40c06",
            300: "#851613",
            200: "#631613",
            100: "#421210",
            50: "#210a0a",
    },
    blueAccent: {
            950: "#f7f8ff",
            900: "#f0f0ff",
            800: "#d9dbff",
            700: "#c2c5fc",
            600: "#959afc",
            500: "#6870fa",
            400: "#0914e0",
            300: "#1a2096",
            200: "#1a1e70",
            100: "#15184a",
            50: "#0e0f26",
    },
}

        ),
});

//mui theme settings

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
            ? {
                primary: {
                    main: colors.primary[500],
                },
                 secondary: {
                    main: colors.greenAccent[500],
                 },
                 neutral: {
                     dark: colors.grey[700],
                     main: colors.grey[500],
                     light: colors.grey[100],
                 },
                    background: {
                        default: colors.primary[500],
                    }
                }
                : {
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro",  "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};

//context for color mode
export const ColorModeContext = createContext({
    toggleColormode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        })
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
}


