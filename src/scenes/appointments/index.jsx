import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getAllAppointments, createAppointments } from "../../model/apiService";

const Appointments = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [appointments, setAppointments] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const fetchAppointments = async () => {
        try {
            const data = await getAllAppointments();
            console.log(data);
            setAppointments(data);

        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments(); // Fetch appointments when the component loads
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {

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
        }
    };

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
                            .number()
                            .required("Required")
                            .typeError("Phone number must be a number"),
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
                            <Box
                                display="grid"
                                gap="20px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                                    value={values.startDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.appDate && !!errors.appDate}
                                    helperText={touched.appDate && errors.appDate}
                                />
                            </Box>
                            <Box
                                display="grid"
                                gap="20px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                                    value={values.servicesNames}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.servicesName && !!errors.servicesName}
                                    helperText={touched.servicesName && errors.servicesName}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}

            <Box mt={4}>
                <Typography variant="h6">Appointments List</Typography>
                <Box>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <Box key={appointment.id} mb={2} p={2} border="1px solid #ccc">
                                <Typography>
                                    <strong>Full Name:</strong> {appointment.fullName} {appointment.fullName}
                                </Typography>
                                <Typography>
                                    <strong>Phone Number:</strong> {appointment.phoneNumber}
                                </Typography>
                                <Typography>
                                    <strong>Staff Alias:</strong> {appointment.staffAlias}
                                </Typography>
                                <Typography>
                                    <strong>Appointment Date:</strong> {appointment.appDate}
                                </Typography>
                                <Typography>
                                    <strong>Time:</strong> {appointment.time}
                                </Typography>
                                <Typography>
                                    <strong>Service Names:</strong> {Array.isArray(appointment.servicesName) ? appointment.servicesName.join(",") : appointment.servicesName}
                                </Typography>
                                <Typography>
                                    <strong>Client Preferences:</strong> {appointment.clientPreferences}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No Bookings found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Appointments;