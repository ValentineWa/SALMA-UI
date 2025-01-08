import {Box, Button, TextField, Typography, useTheme} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getAllCustomers, createCustomer } from "../../model/apiService";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import {mockDataTeam} from "../../data/mockData";
import {tokens} from "../../theme";

const Clients = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [clients, setClients] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [errorMessage, setErrorMessage] = useState( "")

    const fetchClients = async () => {
        try {
            const resp = await getAllCustomers();
            const clientsWithId = resp.data.map((client, index) => ({
                id: index, // Add an `id` field
                ...client,
            }));
            console.log(resp);
            console.log(resp.data);
            console.log("with id", clientsWithId);
            setClients(clientsWithId);
            console.log("set it with id", clients);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients(); // Fetch clients when the component loads
    }, []);

    useEffect(() => {
        console.log("Clients state updated:", clients);
    }, [clients]);
    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const response = await createCustomer(values);
            console.log("Client created", response);
            console.log("Client created successfully");
            resetForm();
            setOpenForm(false);
            fetchClients();

        } catch (error) {
            console.error("Error creating client:", error);
            alert(error.message);
        }
    };
    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1,
        },
    ];
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
                            {errorMessage && (
                                <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
                                    {errorMessage}
                                </Typography>
                            )}
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

            <Box m="20px">
                <Header title="Our Customers" subtitle="Managing All Our Customers Effectively." />
                <Box
                    m="40px 0 0 0"
                    height="60vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid checkboxSelection rows={clients} columns={columns}  />
                </Box>
            </Box>
        </Box>
    );
};
export default Clients;