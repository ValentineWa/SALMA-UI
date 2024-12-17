import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getAllCustomers, createCustomer } from "../../model/apiService";

const Clients = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [clients, setClients] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const fetchClients = async () => {
        try {
            const data = await getAllCustomers();
            console.log(data);
            setClients(data);

        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients(); // Fetch clients when the component loads
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const response = await createCustomer(values);
            console.log("Client created successfully");
            resetForm();
            setOpenForm(false);
            fetchClients();

        } catch (error) {
            console.error("Error creating client:", error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" mb={2}>
                Client Management
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenForm(true)}
            >
                Create Client
            </Button>

            {openForm && (
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        phoneNumber: "",
                        startDate: "",
                    }}
                    validationSchema={yup.object().shape({
                        firstName: yup.string().required("Required"),
                        lastName: yup.string().required("Required"),
                        phoneNumber: yup
                            .number()
                            .required("Required")
                            .typeError("Phone number must be a number"),
                        startDate: yup.date().required("Required"),
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
                                    label="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.firstName && !!errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                />
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
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={values.startDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.startDate && !!errors.startDate}
                                    helperText={touched.startDate && errors.startDate}
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
                <Typography variant="h6">Client List</Typography>
                <Box>
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <Box key={client.id} mb={2} p={2} border="1px solid #ccc">
                                <Typography>
                                    <strong>Name:</strong> {client.firstName} {client.lastName}
                                </Typography>
                                <Typography>
                                    <strong>Phone:</strong> {client.phoneNumber}
                                </Typography>
                                <Typography>
                                    <strong>Start Date:</strong> {client.startDate}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No clients found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Clients;