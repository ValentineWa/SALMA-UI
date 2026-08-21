import React from "react";

import { Box, Typography } from "@mui/material";

import DashboardCard from "./DashboardCard";
import GeographyChart from "../components/GeographyChart";

const GeographyCard = () => {
    return (
        <Box
            gridColumn="span 12"
        >
            <DashboardCard
                sx={{
                    p: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Global Customer Distribution
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={1}
                >
                    Customer locations and sales coverage.
                </Typography>

                <Box
                    mt={3}
                    height="420px"
                >
                    <GeographyChart isDashboard />
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default GeographyCard;