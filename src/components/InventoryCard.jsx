import React from "react";

import {
    Box,
    LinearProgress,
    Typography,
} from "@mui/material";

import DashboardCard from "./DashboardCard";

const InventoryCard = () => {
    return (
        <Box
            gridColumn={{
                xs: "span 12",
                lg: "span 4",
            }}
        >
            <DashboardCard
                sx={{
                    p: 4,
                    height: "100%",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Inventory Status
                </Typography>

                <Typography
                    mt={1}
                    color="text.secondary"
                >
                    Warehouse availability
                </Typography>

                <Box mt={5}>
                    <Typography fontWeight={600}>
                        Stock Health
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={82}
                        sx={{
                            mt: 2,
                            height: 10,
                            borderRadius: 30,

                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#b80049",
                            },
                        }}
                    />

                    <Typography
                        mt={2}
                        color="text.secondary"
                    >
                        82% available
                    </Typography>

                    <Typography
                        mt={3}
                        fontWeight={700}
                        color="#E67E22"
                    >
                        12 products need restocking.
                    </Typography>
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default InventoryCard;