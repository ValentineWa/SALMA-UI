import {Box, Button, TextField, Typography, useTheme} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Header from "../../components/Header";
import {tokens} from "../../theme";

import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from "../../model/apiService";

const Clients = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [clients, setClients] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [errorMessage, setErrorMessage] = useState( "")
    const [rowModesModel, setRowModesModel] = useState({});
    const fetchClients = async () => {
        try {
            const resp = await getAllCustomers();
            const clientelle = resp.data;
            console.log(resp.data);
            setClients(clientelle);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };
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


    const handleDeleteClick = (id) => async () => {
        try {
            await deleteCustomer(id);
            setClients((prev) => prev.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    };

    const processRowUpdate = async (newRow, oldRow) => {
        console.log("Processing row update:", newRow);

        try {
            await updateCustomer(newRow.id, newRow);
            console.log("Update successful for:", newRow);

            return newRow;
        } catch (error) {
            console.error("Error updating row:", error);
            return oldRow;
        }
    };

    const handleSaveClick = async (id, updatedRow) => {
        console.log("Saving client:", updatedRow);

        try {
            const updatedData = await processRowUpdate(updatedRow);
            console.log("Client updated successfully:", updatedData);

            setRowModesModel((prev) => ({
                ...prev,
                [id]: { mode: GridRowModes.View },
            }));

            fetchClients();
        } catch (error) {
            console.error("Error saving client:", error);
        }
    };



    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
        const editedRow = clients.find((row) => row.id === id);
        if (editedRow.isNew) {
            setClients((prev) => prev.filter((row) => row.id !== id));
        }
    };

    const columns = [
        { field: "firstName", headerName: "First Name", flex: 1, editable: true },
        { field: "lastName", headerName: "Last Name", flex: 1, editable: true },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1, editable: true },
        { field: "startDate", headerName: "Start Date", flex: 1, editable: true },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            getActions: ({ id, row }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            }

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


            </Box>
            <Box mt={3} sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={clients}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={setRowModesModel}
                    processRowUpdate={processRowUpdate}
                    onRowEditStop={(params, event) => {
                        if (event) {
                            event.defaultMuiPrevented = true;
                        }
                    }}
                />
            </Box>
        </Box>
    );
};
export default Clients;