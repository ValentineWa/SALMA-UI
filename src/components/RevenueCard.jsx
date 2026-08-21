import React from "react";

import {
    Box,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

import DashboardCard from "./DashboardCard";
import LineChart from "../components/LineChart";

const RevenueCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            gridColumn={{
                xs: "span 12",
                lg: "span 8",
            }}
            gridRow="span 2"
        >
            <DashboardCard
                sx={{
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    pt={3}
                    pb={2}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color={colors.grey[100]}
                        >
                            Revenue Analytics
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            mt={1}
                            color="#2ECC71"
                        >
                            $59,342
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mt={1}
                        >
                            Revenue generated this month
                        </Typography>
                    </Box>

                    <IconButton
                        sx={{
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? colors.primary[500]
                                    : "#F7F7F8",

                            width: 48,
                            height: 48,

                            "&:hover": {
                                backgroundColor:
                                    theme.palette.mode === "dark"
                                        ? colors.primary[600]
                                        : "#ECECEC",
                            },
                        }}
                    >
                        <DownloadOutlinedIcon />
                    </IconButton>
                </Box>

                <Divider />

                <Box
                    height="320px"
                    p={2}
                >
                    <LineChart isDashboard />
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default RevenueCard;