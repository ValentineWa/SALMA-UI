import React from "react";
import { Box, Button, Typography } from "@mui/material";

import DashboardCard from "./DashboardCard";
import ProgressCircle from "../components/ProgressCircle";

const CampaignCard = () => {
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
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Campaign Performance
                </Typography>

                <Box mt={4}>
                    <ProgressCircle size="135" />
                </Box>

                <Typography
                    variant="h4"
                    color="#2ECC71"
                    fontWeight={700}
                    mt={4}
                >
                    $48,352
                </Typography>

                <Typography
                    color="text.secondary"
                    mt={1}
                >
                    Revenue Generated
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={3}
                    sx={{ maxWidth: 260 }}
                >
                    Campaign revenue includes extra expenditures and
                    operational costs.
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        mt: 4,
                        px: 4,
                        borderRadius: "12px",
                        backgroundColor: "#b80049",
                        textTransform: "none",

                        "&:hover": {
                            backgroundColor: "#98003d",
                        },
                    }}
                >
                    View Report
                </Button>
            </DashboardCard>
        </Box>
    );
};

export default CampaignCard;