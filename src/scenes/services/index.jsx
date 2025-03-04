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
import { getAllServices, createService, updateService, deleteService } from "../../model/apiService";

const Services = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [services, setServices] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [errorMessage, setErrorMessage] = useState( "")
    const [rowModesModel, setRowModesModel] = useState({});
    const fetchServices = async () => {
        try {
            const resp = await getAllServices();
            const serv = resp.data;
            console.log(resp.data);
            setServices(serv);
        } catch (error) {
            console.error("Error fetching Services:", error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };
    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const response = await createService(values);
            console.log("Service created", response);
            console.log("Service created successfully");
            resetForm();
            setOpenForm(false);
            fetchServices();

        } catch (error) {
            console.error("Error creating service:", error);
            alert(error.message);
        }
    };


    const handleDeleteClick = (id) => async () => {
        try {
            await deleteService(id);
            setServices((prev) => prev.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const processRowUpdate = async (newRow, oldRow) => {
        console.log("Processing row update:", newRow);

        try {
            await updateService(newRow.id, newRow);
            console.log("Update successful for:", newRow);

            return newRow;
        } catch (error) {
            console.error("Error updating row:", error);
            return oldRow;
        }
    };

    const handleSaveClick = async (id, updatedRow) => {
        console.log("Saving service:", updatedRow);

        try {
            const updatedData = await processRowUpdate(updatedRow);
            console.log("Service updated successfully:", updatedData);

            setRowModesModel((prev) => ({
                ...prev,
                [id]: { mode: GridRowModes.View },
            }));

            fetchServices();
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };



    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
        const editedRow = services.find((row) => row.id === id);
        if (editedRow.isNew) {
            setServices((prev) => prev.filter((row) => row.id !== id));
        }
    };

    const columns = [
        { field: "serviceName", headerName: "Service Name", flex: 1, editable: true },
        { field: "duration", headerName: "Duration", flex: 1, editable: true },
        { field: "price", headerName: "Price", flex: 1, editable: true },
        { field: "description", headerName: "Description", flex: 1, editable: true },
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
                Service Management
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenForm(true)}
            >
                Create Services
            </Button>

            {openForm && (
                <Formik
                    initialValues={{
                        serviceName: "",
                        duration: "",
                        price: "",
                        description: "",
                    }}
                    validationSchema={yup.object().shape({
                        serviceName: yup.string().required("Required"),
                        duration: yup.string().required("Required"),
                        price: yup.string().required("Required"),
                        description: yup.string().required("Required"),
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
                                    label="Service Name"
                                    name="serviceName"
                                    value={values.serviceName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.serviceName && !!errors.serviceName}
                                    helperText={touched.serviceName && errors.serviceName}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Duration"
                                    name="duration"
                                    value={values.duration}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.duration && !!errors.duration}
                                    helperText={touched.duration && errors.duration}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Price"
                                    name="price"
                                    value={values.price}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Description"
                                    name="description"
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
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
                <Header title="Our Services" subtitle="Managing All Our Services Effectively." />


            </Box>
            <Box mt={3} sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={services}
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
export default Services;