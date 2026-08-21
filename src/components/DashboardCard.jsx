import { Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const DashboardCard = ({ children, sx = {} }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Paper
            elevation={0}
            sx={{
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? colors.primary[400]
                        : "#ffffff",

                borderRadius: "18px",

                border:
                    theme.palette.mode === "dark"
                        ? `1px solid ${colors.primary[500]}`
                        : "1px solid #F0F0F3",

                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 10px 30px rgba(0,0,0,.25)"
                        : "0 10px 30px rgba(0,0,0,.05)",

                transition: ".25s",

                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 14px 35px rgba(0,0,0,.30)"
                            : "0 14px 35px rgba(0,0,0,.08)",
                },

                ...sx,
            }}
        >
            {children}
        </Paper>
    );
};

export default DashboardCard;