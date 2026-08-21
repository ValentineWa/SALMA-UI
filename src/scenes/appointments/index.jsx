import { Box, Button, CircularProgress, TextField, Typography, Chip, Stack, Menu, MenuItem, FormControl, InputLabel, Select, OutlinedInput } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import {
    getAllAppointments,
    createAppointments,
    triggerAppointmentPayment,
    setAppointmentInProgress,
    cancelAppointment,
    markAppointmentNoShow,
    completeAppointment,
    updateAppointment,
    deleteAppointment
} from "../../model/apiService";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Appointments = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [actionBusyId, setActionBusyId] = useState(null);
    const [rowModesModel, setRowModesModel] = useState({});
    const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
    const [statusMenuRow, setStatusMenuRow] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState([]); // empty = all

    const STATUS_OPTIONS = [
        "OPEN",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
        "NO_SHOW",
    ];

    // Small helpers to robustly read fields (supports nested payloads e.g. row.booking.first_name)
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
        // common nesting variants from APIs
        const containers = [row?.booking, row?.appointment, row?.data, row?.payload, row?.details];
        for (const c of containers) {
            const v = readFrom(c, keys);
            if (v !== undefined) return v;
        }
        return undefined;
    };

    const getId = (a) => readField(a, ["id", "_id", "bookingId", "appointmentId"]); 
    const getStatus = (a) => readField(a, ["app_status", "status", "appStatus"]) || "OPEN";
    const computeNextStatus = (current) => {
        const order = ["OPEN", "IN_PROGRESS", "COMPLETED", "NO_SHOW"];
        const idx = order.indexOf((current || "OPEN").toUpperCase());
        if (idx === -1) return "OPEN";
        return order[(idx + 1) % order.length];
    };

    // Call correct backend endpoint per-status. Completed requires payload body.
    const callStatusEndpoint = async (appointment, targetStatus) => {
        const id = getId(appointment);
        const up = (targetStatus || "").toUpperCase();
        if (up === "IN_PROGRESS") {
            return setAppointmentInProgress(id);
        }
        if (up === "CANCELLED") {
            return cancelAppointment(id);
        }
        if (up === "NO_SHOW") {
            return markAppointmentNoShow(id);
        }
        if (up === "COMPLETED") {
            // Build payload as per backend sample body
            const payload = {
                firstName: appointment.first_name || appointment.firstName || "",
                lastName: appointment.last_name || appointment.lastName || "",
                phoneNumber: appointment.phone_number || appointment.phoneNumber || "",
                staffAlias: appointment.staff_alias || appointment.staffAlias || "",
                appDate: appointment.app_date || appointment.appDate || "",
                time: appointment.time || "",
                clientPreferences: appointment.client_preferences || appointment.clientPreferences || "",
            };
            // Normalize services into servicesName array of strings
            const rawServices = appointment.services_name ?? appointment.servicesName ?? appointment.services ?? [];
            let services = [];
            if (Array.isArray(rawServices)) {
                services = rawServices.map((s) => typeof s === "string" ? s : (s && (s.serviceName || s.name)) || null).filter(Boolean);
            } else if (rawServices && typeof rawServices === "object" && Array.isArray(rawServices.servicesName)) {
                services = rawServices.servicesName.filter(Boolean);
            } else if (typeof rawServices === "string") {
                services = [rawServices];
            }
            payload.servicesName = services;
            return completeAppointment(id, payload);
        }
        // If target is SCHEDULED or unknown: no-op as backend has no endpoint for that in examples
        return Promise.resolve();
    };

    const applyLocalStatusUpdate = (id, newStatus) => {
        setAppointments((prev) => prev.map((a) => {
            const aid = getId(a);
            if (String(aid) !== String(id)) return a;
            // Preserve whichever status field exists
            if (Object.prototype.hasOwnProperty.call(a, "app_status")) {
                return { ...a, app_status: newStatus };
            }
            if (Object.prototype.hasOwnProperty.call(a, "status")) {
                return { ...a, status: newStatus };
            }
            return { ...a, app_status: newStatus };
        }));
    };

    const handleAdvanceStatus = async (appointment) => {
        const id = getId(appointment);
        const current = getStatus(appointment);
        const next = computeNextStatus(current);
        try {
            setActionBusyId(id);
            await callStatusEndpoint(appointment, next);
            applyLocalStatusUpdate(id, next);
        } catch (e) {
            console.error("Advance status failed", e);
        } finally {
            setActionBusyId(null);
        }
    };

    const handleSetStatus = async (appointment, newStatus) => {
        const id = getId(appointment);
        try {
            setActionBusyId(id);
            await callStatusEndpoint(appointment, newStatus);
            applyLocalStatusUpdate(id, newStatus);
        } catch (e) {
            console.error("Set status failed", e);
        } finally {
            setActionBusyId(null);
        }
    };

    const handleTriggerPayment = async (appointment) => {
        const id = getId(appointment);
        try {
            setActionBusyId(id);
            await triggerAppointmentPayment(id);
        } catch (e) {
            console.error("Trigger payment failed", e);
        } finally {
            setActionBusyId(null);
        }
    };

    const openStatusMenu = (event, row) => {
        setStatusMenuAnchor(event.currentTarget);
        setStatusMenuRow(row);
    };
    const closeStatusMenu = () => {
        setStatusMenuAnchor(null);
        setStatusMenuRow(null);
    };

    const fetchAppointments = async () => {
        try {
            setError("");
            setLoading(true);
            const resp = await getAllAppointments();
            // Robustly extract an array from common API wrapper shapes
            const extractArray = (r) => {
                if (Array.isArray(r)) return r;
                if (Array.isArray(r?.data)) return r.data;
                if (Array.isArray(r?.data?.data)) return r.data.data;
                if (Array.isArray(r?.items)) return r.items;
                if (Array.isArray(r?.content)) return r.content;
                return [];
            };
            const data = extractArray(resp);
            console.log("[Appointments] fetched rows:", Array.isArray(data) ? data.length : 0, data);
            setAppointments(Array.isArray(data) ? data : []);

        } catch (error) {
            console.error("Error fetching appointments:", error);
            setError(error.message || "Failed to load appointments");
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments(); // Fetch appointments when the component loads
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            setError("");

            const formattedValues = {...values,
                servicesName: values.servicesName.split(",").map((s) => s.trim()), // Convert to array
            };

            const response = await createAppointments(formattedValues);
            console.log("Appointment created successfully");

            resetForm();
            setOpenForm(false);
            fetchAppointments();

        } catch (error) {
            console.error("Error creating appointment:", error);
            setError(error.message || "Failed to create appointment");
        }
    };

    // Row editing handlers (double-click to edit + save button)
    const processRowUpdate = async (newRow, oldRow) => {
        try {
            const id = getId(newRow) || getId(oldRow);
            await updateAppointment(id, newRow);
            return newRow;
        } catch (e) {
            console.error("Error updating appointment:", e);
            return oldRow;
        }
    };

    const handleRowEditStop = (params, event) => {
        // prevent default to keep control via actions
    };

    const handleSaveClick = (id, row) => async () => {
        try {
            await processRowUpdate(row, row);
            setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
            fetchAppointments();
        } catch (e) {
            // already logged
        }
    };
    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };
    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
    };
    const handleDeleteClick = (id) => async () => {
        try {
            await deleteAppointment(id);
            // Use the same getId helper used elsewhere to ensure we remove the right item
            setAppointments((prev) => prev.filter((row) => String(getId(row)) !== String(id)));
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };
    // Helpers to mirror Clients DataGrid display
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

    const columns = [
        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1.2,
            renderCell: (params) => {
                const row = params.row;

                const firstName = row.first_name || "";
                const lastName = row.last_name || "";

                return `${firstName} ${lastName}`.trim() || "-";
            },
        },

        {
            field: "phone_number",
            headerName: "Phone",
            flex: 1,
            renderCell: (params) => {
                return params.row.phone_number || "-";
            },
        },

        {
            field: "staff_alias",
            headerName: "Staff",
            flex: 1,
            renderCell: (params) => {
                return params.row.staff_alias || "-";
            },
        },

        {
            field: "app_date",
            headerName: "Date",
            flex: 1,
            renderCell: (params) => {
                return params.row.app_date || "-";
            },
        },

        {
            field: "time",
            headerName: "Time",
            flex: 1,
            renderCell: (params) => {
                return params.row.time || "-";
            },
        },

        {
            field: "services_name",
            headerName: "Services",
            flex: 1.5,
            renderCell: (params) => {
                const services = params.row.services_name;

                if (!Array.isArray(services) || services.length === 0) {
                    return "-";
                }

                return services
                    .map((service) => service.serviceName)
                    .filter(Boolean)
                    .join(", ");
            },
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => {
                const row = params.row;
                const status = getStatus(row);
                const up = (status || "").toUpperCase();

                const color =
                    up === "COMPLETED"
                        ? "success"
                        : up === "OPEN"
                            ? "info"
                            : up === "IN_PROGRESS"
                                ? "warning"
                                : up === "CANCELLED"
                                    ? "default"
                                    : up === "NO_SHOW"
                                        ? "error"
                                        : "info";

                return (
                    <Chip
                        label={status || "-"}
                        color={color}
                        size="small"
                        onClick={(e) => openStatusMenu(e, row)}
                        clickable
                    />
                );
            },
        },

        {
            field: "editActions",
            type: "actions",
            headerName: "Edit",
            width: 120,

            getActions: ({ id, row }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={() => handleSaveClick(id, row)}
                        />,

                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => handleEditClick(id)}
                        color="inherit"
                    />,

                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },

        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            sortable: false,
            filterable: false,

            renderCell: (params) => {
                const row = params.row;

                if (!row) {
                    return null;
                }

                const id = getId(row);
                const busy = String(actionBusyId) === String(id);

                return (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ width: "100%" }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={busy}
                            onClick={() =>
                                handleTriggerPayment(row)
                            }
                        >
                            {busy ? "Processing…" : "Payment"}
                        </Button>
                    </Stack>
                );
            },
        },
    ];

    // Derived filtered rows for DataGrid
    const normalize = (v) => (v || "").toString().toLowerCase();
    const contains = (hay, needle) => normalize(hay).includes(normalize(needle));
    const filteredAppointments = (appointments || []).filter((a) => {
        // Status filter
        const status = (getStatus(a) || "").toUpperCase();
        const statusPass = statusFilter.length === 0 || statusFilter.includes(status);
        if (!statusPass) return false;
        // Search filter across key fields
        if (!search) return true;
        const fullName = [a.first_name, a.last_name, a.fullName].filter(Boolean).join(" ");
        const phone = a.phone_number || a.phoneNumber || "";
        const staff = a.staff_alias || a.staffAlias || "";
        const services = normalizeServiceNames(a);
        const date = a.app_date || a.appDate || "";
        const time = a.time || "";
        const haystack = [fullName, phone, staff, services, date, time].join(" ");
        return contains(haystack, search);
    });

    return (
        <Box>
            <Typography variant="h4" mb={2}>
                Appointment Management
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenForm(true)}
            >
                New Appointment
            </Button>

            {openForm && (
                <Formik
                    initialValues={{
                        fullName: "",
                        phoneNumber: "",
                        staffAlias: "",
                        appDate: "",
                        time: "",
                        servicesName: "",
                        clientPreferences: "",
                    }}
                    validationSchema={yup.object().shape({
                        fullName: yup.string().required("Required"),
                        phoneNumber: yup
                            .string()
                            .matches(/^[+0-9 ()-]{7,20}$/i, "Enter a valid phone number")
                            .required("Required"),
                        staffAlias: yup.string().required("Required"),
                        appDate: yup.string().required("Required"),
                        time: yup.string().required("Required"),
                        servicesName: yup.string().required("Required"),
                        clientPreferences: yup.string().required("Required"),
                    })}
                    onSubmit={handleFormSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                      }) => (
                        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                            {/* Responsive form container */}
                            <Box sx={{ maxWidth: 1000, mx: "auto", p: { xs: 2, sm: 3 } }}>
                                <Box
                                    display="grid"
                                    gap={2}
                                    sx={{
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "repeat(2, 1fr)",
                                            md: "repeat(4, 1fr)",
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Full Name"
                                        name="fullName"
                                        value={values.fullName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.fullName && !!errors.fullName}
                                        helperText={touched.fullName && errors.fullName}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Staff Alias"
                                        name="staffAlias"
                                        value={values.staffAlias}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.staffAlias && !!errors.staffAlias}
                                        helperText={touched.staffAlias && errors.staffAlias}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Booking Date"
                                        name="appDate"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.appDate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.appDate && !!errors.appDate}
                                        helperText={touched.appDate && errors.appDate}
                                    />
                                </Box>
                                <Box
                                    display="grid"
                                    gap={2}
                                    sx={{
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "repeat(2, 1fr)",
                                            md: "repeat(4, 1fr)",
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.phoneNumber && !!errors.phoneNumber}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Time"
                                        name="time"
                                        type="time"
                                        value={values.time}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.time && !!errors.time}
                                        helperText={touched.time && errors.time}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="Client Preferences"
                                        name="clientPreferences"
                                        value={values.clientPreferences}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.clientPreferences && !!errors.clientPreferences}
                                        helperText={touched.clientPreferences && errors.clientPreferences}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        label="My Services (comma-separated)"
                                        name="servicesName"
                                        value={values.servicesName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched.servicesName && !!errors.servicesName}
                                        helperText={touched.servicesName && errors.servicesName}
                                    />
                                </Box>
                                <Box display="flex" justifyContent={{ xs: "stretch", sm: "end" }} mt={3}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        fullWidth={!isNonMobile}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}

            <Box mt={4}>
                <Typography variant="h6">Appointments List</Typography>
                <Box mt={2}>
                    {/* Toolbar: Search and Status Filter */}
                    <Box
                        display="grid"
                        gap={2}
                        sx={{
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1fr" },
                            mb: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search appointments"
                            placeholder="Search by name, phone, staff, service, date or time"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="status-filter-label">Filter by status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                multiple
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                                input={<OutlinedInput label="Filter by status" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected || []).map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {STATUS_OPTIONS.map((opt) => (
                                    <MenuItem key={opt} value={opt}>
                                        {opt}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    {loading && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <CircularProgress size={20} />
                            <Typography>Loading appointments…</Typography>
                        </Box>
                    )}
                    {!loading && error && (
                        <Typography color="error">{error}</Typography>
                    )}
                    {!loading && !error && (
                        filteredAppointments.length > 0 ? (
                            <div style={{ width: "100%", overflowX: "auto" }}>
                                <DataGrid
                                    autoHeight
                                    density={isNonMobile ? "standard" : "compact"}
                                    rows={filteredAppointments}
                                    columns={columns}
                                    getRowId={(row) => getId(row)}
                                    disableRowSelectionOnClick
                                    editMode="row"
                                    rowModesModel={rowModesModel}
                                    onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                                    processRowUpdate={processRowUpdate}
                                    onRowDoubleClick={(params) => setRowModesModel((prev) => ({ ...prev, [getId(params.row)]: { mode: GridRowModes.Edit } }))}
                                />
                                <Menu
                                    anchorEl={statusMenuAnchor}
                                    open={Boolean(statusMenuAnchor)}
                                    onClose={closeStatusMenu}
                                >
                                    {STATUS_OPTIONS.map((opt) => {
                                        const current = statusMenuRow ? (statusMenuRow.app_status || statusMenuRow.status || statusMenuRow.appStatus || "OPEN") : "";
                                        const up = (current || "").toUpperCase();
                                        const busy = statusMenuRow && String(actionBusyId) === String(getId(statusMenuRow));
                                        return (
                                            <MenuItem
                                                key={opt}
                                                disabled={busy || opt === up}
                                                onClick={() => {
                                                    const row = statusMenuRow;
                                                    closeStatusMenu();
                                                    if (row) handleSetStatus(row, opt);
                                                }}
                                            >
                                                {opt}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </div>
                        ) : (
                            <Typography>No bookings found.</Typography>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Appointments;