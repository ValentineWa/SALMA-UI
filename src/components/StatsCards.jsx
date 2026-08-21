import React, { useEffect, useMemo, useState } from "react";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

import DashboardCard from "./DashboardCard";
import StatBox from "../components/StatBox";
import { getDashboardStats } from "../model/apiService";

const StatsCards = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError("");
                const resp = await getDashboardStats();
                // Robustly extract payload object
                const data = (resp && typeof resp === 'object') ? (resp.data && typeof resp.data === 'object' && !Array.isArray(resp.data)
                    ? (resp.data.data && typeof resp.data.data === 'object' && !Array.isArray(resp.data.data)
                        ? resp.data.data
                        : resp.data)
                    : resp) : null;
                if (mounted) setStats(data || resp || null);
            } catch (e) {
                if (mounted) setError(e.message || 'Failed to load dashboard');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchStats();
        return () => { mounted = false; };
    }, []);

    const num = (v) => {
        const n = typeof v === 'string' ? Number(v.replace(/[, ]+/g, '')) : Number(v);
        return Number.isFinite(n) ? n : 0;
    };

    // Map backend fields to UI cards with generous key fallbacks
    const metrics = useMemo(() => {
        const s = stats || {};
        const lower = Object.fromEntries(Object.entries(s).map(([k, v]) => [String(k || '').toLowerCase(), v]));
        const pick = (...keys) => {
            for (const k of keys) {
                if (s[k] != null) return s[k];
                const lk = String(k).toLowerCase();
                if (lower[lk] != null) return lower[lk];
            }
            return 0;
        };

        return {
            // Backend provides 'openAppointments' for current open/new appointments
            newAppointments: num(pick('openAppointments', 'newAppointments', 'neappointments', 'new_appointments', 'newappointments')),
            // Backend provides 'totalCustomerCount' for total customers
            totalCustomers: num(pick('totalCustomerCount', 'totalCustomers', 'toalCustomers', 'total_customers', 'customersTotal')),
            // Backend provides 'newCustomerCount' for new customers
            newCustomers: num(pick('newCustomerCount', 'newCustomers', 'customerCount', 'customercount', 'customer_count')),
        };
    }, [stats]);

    return (
        <>
            {/* New Appointments (replaces Emails Sent) */}

            <Box
                gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    lg: "span 3",
                }}
            >
                <DashboardCard
                    sx={{
                        p: 3,
                        height: "100%",
                    }}
                >
                    <StatBox
                        title={loading ? "…" : error ? "-" : String(metrics.newAppointments)}
                        subtitle="New Appointments"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon
                                sx={{
                                    color: "#2ECC71",
                                    fontSize: 30,
                                }}
                            />
                        }
                    />
                </DashboardCard>
            </Box>

            {/* Total Customers (replaces Sales) */}

            <Box
                gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    lg: "span 3",
                }}
            >
                <DashboardCard
                    sx={{
                        p: 3,
                        height: "100%",
                    }}
                >
                    <StatBox
                        title={loading ? "…" : error ? "-" : String(metrics.totalCustomers)}
                        subtitle="Total Customers"
                        progress="0.58"
                        increase="+22%"
                        icon={
                            <PointOfSaleIcon
                                sx={{
                                    color: "#2ECC71",
                                    fontSize: 30,
                                }}
                            />
                        }
                    />
                </DashboardCard>
            </Box>

            {/* New Customers */}

            <Box
                gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    lg: "span 3",
                }}
            >
                <DashboardCard
                    sx={{
                        p: 3,
                        height: "100%",
                    }}
                >
                    <StatBox
                        title={loading ? "…" : error ? "-" : String(metrics.newCustomers)}
                        subtitle="New Customers"
                        progress="0.43"
                        increase="+9%"
                        icon={
                            <PersonAddIcon
                                sx={{
                                    color: "#2ECC71",
                                    fontSize: 30,
                                }}
                            />
                        }
                    />
                </DashboardCard>
            </Box>

            {/* Income */}

            <Box
                gridColumn={{
                    xs: "span 12",
                    sm: "span 6",
                    lg: "span 3",
                }}
            >
                <DashboardCard
                    sx={{
                        p: 3,
                        height: "100%",
                        background:
                            "linear-gradient(135deg,#b80049,#d81b60)",
                        color: "#fff",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            opacity: .8,
                            letterSpacing: 1,
                        }}
                    >
                        MONTHLY INCOME
                    </Typography>

                    <Typography
                        variant="h3"
                        fontWeight={700}
                        mt={1}
                    >
                        $6,240
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mt={4}
                    >
                        <Inventory2Icon />

                        <Typography fontWeight={600}>
                            Monthly Target Achieved
                        </Typography>
                    </Stack>

                    <LinearProgress
                        variant="determinate"
                        value={82}
                        sx={{
                            mt: 2,
                            height: 8,
                            borderRadius: 20,
                            backgroundColor: "rgba(255,255,255,.20)",

                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#fff",
                            },
                        }}
                    />

                    <Typography
                        mt={2}
                        fontSize={13}
                        sx={{
                            opacity: .85,
                        }}
                    >
                        82% completed this month
                    </Typography>
                </DashboardCard>
            </Box>
        </>
    );
};

export default StatsCards;