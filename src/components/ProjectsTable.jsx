import React, { useEffect, useMemo, useState } from "react";

import {
    Box,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import DashboardCard from "./DashboardCard";
import StatusChip from "./StatusChip";
import { getAllAppointments } from "../model/apiService";

const ProjectsTable = () => {
    // Load recent appointments to display on the dashboard table
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Helpers to read flexible API payloads
    const readFrom = (obj, keys = []) => {
        if (!obj) return undefined;
        for (const k of keys) {
            if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] != null) return obj[k];
        }
        return undefined;
    };
    const readField = (row, keys = []) => {
        const direct = readFrom(row, keys);
        if (direct !== undefined) return direct;
        const containers = [row?.booking, row?.appointment, row?.data, row?.payload, row?.details];
        for (const c of containers) {
            const v = readFrom(c, keys);
            if (v !== undefined) return v;
        }
        return undefined;
    };

    const normalizeServiceNames = (appointment) => {
        if (!appointment) return "-";
        const rawServices =
            readField(appointment, ["services_name", "servicesName", "services"]) ?? null;
        if (Array.isArray(rawServices)) {
            const list = rawServices
                .map((s) => (
                    typeof s === "string"
                        ? s
                        : (s && (s.serviceName || s.service_name || s.name)) || null
                ))
                .filter(Boolean);
            return list.length ? list.join(", ") : "-";
        }
        if (rawServices && typeof rawServices === "object" && Array.isArray(rawServices.servicesName)) {
            const list = rawServices.servicesName.filter(Boolean);
            return list.length ? list.join(", ") : "-";
        }
        if (typeof rawServices === "string") return rawServices || "-";
        return "-";
    };

    const getStatus = (a) => (readField(a, ["app_status", "status", "appStatus"]) || "OPEN");
    const statusColor = (status) => {
        const up = String(status || "").toUpperCase();
        // Hex colors to match existing visual style used in this app
        if (up === "COMPLETED") return "#2ECC71"; // green
        if (up === "IN_PROGRESS") return "#F39C12"; // orange
        if (up === "OPEN") return "#3498DB"; // blue
        if (up === "CANCELLED") return "#7f8c8d"; // grey
        if (up === "NO_SHOW") return "#e74c3c"; // red
        return "#b80049"; // default accent
    };

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                setLoading(true);
                setError("");
                const resp = await getAllAppointments();
                const list = Array.isArray(resp?.data) ? resp.data
                    : Array.isArray(resp?.bookings) ? resp.bookings
                        : Array.isArray(resp) ? resp : [];
                if (!mounted) return;
                // Sort by date/time descending if possible
                const parseDateTime = (a) => {
                    const d = readField(a, ["app_date", "appDate", "bookingDate", "appointmentDate"]) || "";
                    const t = readField(a, ["time"]) || "";
                    const iso = `${d} ${t}`.trim();
                    const ts = Date.parse(iso) || Date.parse(d) || 0;
                    return ts;
                };
                const sorted = [...list].sort((a, b) => (parseDateTime(b) - parseDateTime(a)));
                setAppointments(sorted);
            } catch (e) {
                if (mounted) setError(e.message || "Failed to load appointments");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const recent = useMemo(() => appointments.slice(0, 4), [appointments]);

    return (
        <Box
            gridColumn={{
                // xs: "span 12",
                // lg: "span 4",
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
                    py={2.5}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Recent Appointments
                    </Typography>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            background: "#b80049",
                            borderRadius: "10px",
                            textTransform: "none",

                            "&:hover": {
                                background: "#98003d",
                            },
                        }}
                    >
                        View All
                    </Button>
                </Box>

                <Divider />

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>
                                <Typography fontWeight={700}>
                                    Client
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography fontWeight={700}>
                                    Services
                                </Typography>
                            </TableCell>

                            <TableCell align="right">
                                <Typography fontWeight={700}>
                                    Status
                                </Typography>
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {loading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography color="text.secondary">Loading…</Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && error && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography color="error">{error}</Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && !error && recent.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography color="text.secondary">No recent appointments.</Typography>
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading && !error && recent.map((a) => (

                            <TableRow
                                hover
                                key={a.id || a._id || a.bookingId || a.appointmentId || Math.random()}
                            >
                                <TableCell>

                                    <Typography fontWeight={600}>
                                        {(() => {
                                            const first = readField(a, ["first_name", "firstName"]) || "";
                                            const last = readField(a, ["last_name", "lastName"]) || "";
                                            const combined = [first, last].filter(Boolean).join(" ");
                                            return combined || a.fullName || "-";
                                        })()}
                                    </Typography>

                                </TableCell>

                                <TableCell>

                                    <Typography color="text.secondary">
                                        {normalizeServiceNames(a)}
                                    </Typography>

                                </TableCell>

                                <TableCell align="right">

                                    {(() => {
                                        const s = getStatus(a);
                                        return (
                                            <StatusChip
                                                label={s}
                                                color={statusColor(s)}
                                            />
                                        );
                                    })()}

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

                <Divider />

                <Box
                    p={3}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Showing {Math.min(4, appointments.length)} most recent appointments.
                    </Typography>
                </Box>

            </DashboardCard>
        </Box>
    );
};

export default ProjectsTable;