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
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { getAllStaff, createStaff, updateStaff, deleteStaff } from "../../model/apiService";

const Staff = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [staff, setStaff] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [errorMessage, setErrorMessage] = useState( "")
    const [rowModesModel, setRowModesModel] = useState({});
    const fetchStaff = async () => {
        try {
            const resp = await getAllStaff();
            const serv = resp.data;
            console.log(resp.data);
            setStaff(serv);
        } catch (error) {
            console.error("Error fetching Staff:", error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleEditClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
    };
    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const payload = { ...values, services: Array.isArray(values.services) ? values.services : [values.services] };
            const response = await createStaff(values);
            console.log("Staff created", response);
            console.log("Staff created successfully");
            resetForm();
            setOpenForm(false);
            fetchStaff();

        } catch (error) {
            console.error("Error creating Staff:", error);
            alert(error.message);
        }
    };


    const handleDeleteClick = (id) => async () => {
        try {
            await deleteStaff(id);
            setStaff((prev) => prev.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting Staff:", error);
        }
    };

    const processRowUpdate = async (newRow, oldRow) => {
        console.log("Processing row update:", newRow);

        try {
            await updateStaff(newRow.id, newRow);
            console.log("Update successful for:", newRow);

            return newRow;
        } catch (error) {
            console.error("Error updating row:", error);
            return oldRow;
        }
    };

    const handleSaveClick = async (id, updatedRow) => {
        console.log("Saving Staff:", updatedRow);

        try {
            const updatedData = { ...updatedRow, services: Array.isArray(updatedRow.services) ? updatedRow.services : [updatedRow.services] };

            // const updatedData = await processRowUpdate(updatedRow);
            console.log("Staff updated successfully:", updatedData);

            setRowModesModel((prev) => ({
                ...prev,
                [id]: { mode: GridRowModes.View },
            }));

            fetchStaff();
        } catch (error) {
            console.error("Error saving Staff:", error);
        }
    };



    const handleCancelClick = (id) => () => {
        setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View, ignoreModifications: true } }));
        const editedRow = staff.find((row) => row.id === id);
        if (editedRow.isNew) {
            setStaff((prev) => prev.filter((row) => row.id !== id));
        }
    };

    const columns = [
        { field: "staffName", headerName: "Staff Name", flex: 1, editable: true },
        { field: "staffAlias", headerName: "AKA", flex: 1, editable: true },
        { field: "idNumber", headerName: "ID Number", flex: 1, editable: true },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1, editable: true },
        { field: "startDate", headerName: "Start Date", flex: 1, editable: true },
        { field: "yearOfExperience", headerName: "Years Of Experience", flex: 1, editable: true },
        { field: "nationality", headerName: "Nationality", flex: 1, editable: true },
        { field: "physicalAddress", headerName: "Physical Address", flex: 1, editable: true },
        { field: "services", headerName: "Expertise", flex: 1, editable: true, renderCell: (params) => {
                // Check if serviceNames is an array or object
                if (Array.isArray(params.value)) {
                    return params.value.join(", "); // Convert array to string
                } else if (typeof params.value === "object" && params.value !== null) {
                    return JSON.stringify(params.value); // Convert object to JSON string
                }
                return params.value; // Fallback for other types
            } },
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
                Staff Management
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpenForm(true)}
            >
                Create Staff
            </Button>

            {openForm && (
                <Formik
                    initialValues={{
                        staffName: "",
                        staffAlias: "",
                        idNumber: "",
                        phoneNumber: "",
                        startDate: "",
                        yearOfExperience: "",
                        nationality: "",
                        physicalAddress: "",
                    }}
                    validationSchema={yup.object().shape({
                        staffName: yup.string().required("Required"),
                        staffAlias: yup.string().required("Required"),
                        idNumber: yup.string().required("Required"),
                        phoneNumber: yup.string().required("Required"),
                        startDate: yup.string().required("Required"),
                        yearOfExperience: yup.string().required("Required"),
                        nationality: yup.string().required("Required"),
                        physicalAddress: yup.string().required("Required"),
                        services: yup.array().min(1, "At least one service is required"),
                    })}
                    onSubmit={handleFormSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,setFieldValue
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
                                    label="Staff Name"
                                    name="staffName"
                                    value={values.staffName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.staffName && !!errors.staffName}
                                    helperText={touched.staffName && errors.staffName}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="A.K.A"
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
                                    label="ID Number"
                                    name="idNumber"
                                    value={values.idNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.idNumber && !!errors.idNumber}
                                    helperText={touched.idNumber && errors.idNumber}
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
                                    value={values.startdate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.startDate && !!errors.startDate}
                                    helperText={touched.startDate && errors.startDate}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Years Of Experience"
                                    name="yearOfExperience"
                                    value={values.yearOfExperience}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.yearOfExperience && !!errors.yearOfExperience}
                                    helperText={touched.yearOfExperience && errors.yearOfExperience}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Nationality"
                                    name="nationality"
                                    value={values.nationality}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.nationality && !!errors.nationality}
                                    helperText={touched.nationality && errors.nationality}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Physical Address"
                                    name="physicalAddress"
                                    value={values.physicalAddress}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.physicalAddress && !!errors.physicalAddress}
                                    helperText={touched.physicalAddress && errors.physicalAddress}
                                />
                                <Autocomplete
                                    multiple
                                    options={["Haircut", "Massage", "Nail Care", "Facial", "Makeup"]} // Replace with actual service options
                                    value={values.services}
                                    onChange={(event, newValue) => setFieldValue("services", newValue)}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip key={option} label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => <TextField {...params} label="Expertise" variant="filled" />}
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
                <Header title="Our Staff" subtitle="Managing All Our Staff Effectively." />


            </Box>
            <Box mt={3} sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={staff}
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
export default Staff;