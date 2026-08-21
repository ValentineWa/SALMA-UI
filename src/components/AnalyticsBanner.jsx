import React from "react";
import { Box, Button, Typography } from "@mui/material";

const AnalyticsBanner = () => {
    return (
        <Box
            gridColumn={{
                xs: "span 12",
                lg: "span 8",
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    borderRadius: "18px",
                    background:
                        "linear-gradient(135deg,#b80049,#d81b60,#f06292)",
                    color: "#fff",
                    p: 5,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Box maxWidth="65%">
                    <Typography variant="h3" fontWeight={700}>
                        Analytics Report
                    </Typography>

                    <Typography mt={2} sx={{ opacity: .85 }}>
                        Review your weekly revenue, customer growth,
                        sales performance and operational metrics from
                        one centralized dashboard.
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 4,
                            background: "#fff",
                            color: "#b80049",
                            textTransform: "none",
                            borderRadius: "12px",
                            px: 4,

                            "&:hover": {
                                background: "#fafafa",
                            },
                        }}
                    >
                        Generate Report
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AnalyticsBanner;