import React, { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";

import DashboardCard from "./DashboardCard";
import CustomerRow from "./CustomerRow";
import { getDashboardStats } from "../model/apiService";

const CustomersCard = () => {
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
                // Normalize payload similar to StatsCards.jsx
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

    // Extract the new customers "map" from the stats object with generous key fallbacks
    const newCustomersList = useMemo(() => {
        const s = stats || {};
        const lower = Object.fromEntries(Object.entries(s).map(([k, v]) => [String(k || '').toLowerCase(), v]));
        const pick = (...keys) => {
            for (const k of keys) {
                if (s && s[k] != null) return s[k];
                const lk = String(k).toLowerCase();
                if (lower && lower[lk] != null) return lower[lk];
            }
            return undefined;
        };

        // Possible backend key names including the misspelling mentioned: newCusstomers
        let mapOrArray = pick('newCustomers', 'newCusstomers', 'new_customers', 'recentCustomers', 'recent_customers');
        if (!mapOrArray) return [];

        // If it's an object/map, convert to array either from values or entries
        if (Array.isArray(mapOrArray)) return mapOrArray;
        if (mapOrArray && typeof mapOrArray === 'object') {
            // Sometimes the map can be nested under 'data' or similar
            const inner = mapOrArray.data && typeof mapOrArray.data === 'object' ? mapOrArray.data : mapOrArray;
            const values = Object.values(inner);
            return Array.isArray(values) ? values : [];
        }
        return [];
    }, [stats]);

    const customers = useMemo(() => {
        return (newCustomersList || []).map((c, idx) => {
            const obj = c || {};
            const first = obj.firstName || obj.firstname || obj.first_name || '';
            const last = obj.lastName || obj.lastname || obj.last_name || '';
            const name = (obj.name || `${first} ${last}`.trim() || obj.fullName || obj.full_name || 'New Customer').trim();
            const company = obj.company || obj.companyName || obj.company_name || obj.email || obj.phone || '—';
            const avatar = obj.avatar || obj.avatarUrl || obj.avatarURL || obj.photoUrl || obj.imageUrl || undefined;
            const id = obj.id || obj.customerId || obj.customer_id || idx;
            return { id, name, company, avatar };
        });
    }, [newCustomersList]);

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
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={3}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        New Customers
                    </Typography>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: "#b80049",
                            borderRadius: "10px",
                            textTransform: "none",

                            "&:hover": {
                                backgroundColor: "#98003d",
                            },
                        }}
                    >
                        View All
                    </Button>
                </Box>

                <Divider />

                <Box px={3}>
                    {loading && (
                        <Typography variant="body2" color="text.secondary" py={2}>
                            Loading…
                        </Typography>
                    )}
                    {!loading && error && (
                        <Typography variant="body2" color="error" py={2}>
                            {error}
                        </Typography>
                    )}
                    {!loading && !error && customers.length === 0 && (
                        <Typography variant="body2" color="text.secondary" py={2}>
                            No new customers.
                        </Typography>
                    )}
                    {!loading && !error && customers.map((customer, index) => (
                        <CustomerRow
                            key={customer.id}
                            avatar={customer.avatar}
                            name={customer.name}
                            company={customer.company}
                            divider={index !== customers.length - 1}
                        />
                    ))}
                </Box>

                <Divider />

                <Box p={3}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {loading
                            ? "Fetching new customers…"
                            : error
                                ? "Unable to load new customers."
                                : customers.length === 0
                                    ? "No new customers today."
                                    : `${customers.length} ${customers.length === 1 ? "customer" : "customers"} joined recently.`}
                    </Typography>
                </Box>
            </DashboardCard>
        </Box>
    );
};

export default CustomersCard;