import React from "react";

import { Box, Typography } from "@mui/material";

import DashboardCard from "./DashboardCard";
import BarChart from "../components/BarChart";

const SalesQuantityCard = () => {
    return (
        <Box
            gridColumn={{
                xs: "span 12",
                md: "span 4",
            }}
            gridRow="span 2"
        >
            <DashboardCard
                sx={{
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                <Box p={3}>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Sales Quantity
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        Product sales distribution this month.
                    </Typography>
                </Box>

                <Box
                    height="320px"
                >
                    <BarChart isDashboard />
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default SalesQuantityCard;