import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const DashboardHeader = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            mb={3}
        >
            <Box>
                <Typography
                    variant="h3"
                    fontWeight={700}
                    color={colors.grey[100]}
                >
                    Dashboard
                </Typography>

                <Typography
                    variant="body1"
                    color={colors.grey[300]}
                    mt={1}
                >
                    Welcome back! Here's what's happening today.
                </Typography>
            </Box>

            <Button
                variant="contained"
                startIcon={<DownloadOutlinedIcon />}
                sx={{
                    backgroundColor: "#b80049",
                    color: "#fff",
                    px: 3,
                    py: 1.2,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,

                    "&:hover": {
                        backgroundColor: "#97003c",
                    },
                }}
            >
                Download Report
            </Button>
        </Box>
    );
};

export default DashboardHeader;