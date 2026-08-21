import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
    Autocomplete,
    Chip,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
    Add as AddIcon,
    Edit as EditIcon,
    DeleteOutlined as DeleteIcon,
    Save as SaveIcon,
    Close as CancelIcon,
} from "@mui/icons-material";

import {
    DataGrid,
    GridActionsCellItem,
    GridRowModes,
} from "@mui/x-data-grid";

import Header from "../../components/Header";
import { tokens } from "../../theme";

import {
    getAllStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    getAllServices,
} from "../../model/apiService";


const Staff = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [staff, setStaff] = useState([]);
    const [services, setServices] = useState([]);

    const [openForm, setOpenForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [rowModesModel, setRowModesModel] = useState({});


    // ---------------------------------------------------------
    // FETCH STAFF
    // ---------------------------------------------------------

    const fetchStaff = async () => {
        try {
            const response = await getAllStaff();

            console.log("Staff response:", response);

            setStaff(response?.data || []);

        } catch (error) {
            console.error("Error fetching staff:", error);
            setErrorMessage(error.message || "Failed to load staff");
        }
    };


    // ---------------------------------------------------------
    // FETCH SERVICES
    // ---------------------------------------------------------

    const fetchServices = async () => {
        try {
            const response = await getAllServices();

            console.log("Services response:", response);

            setServices(response?.data || []);

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };


    useEffect(() => {
        fetchStaff();
        fetchServices();
    }, []);


    // ---------------------------------------------------------
    // EDIT
    // ---------------------------------------------------------

    const handleEditClick = (id) => () => {

        setRowModesModel((previous) => ({
            ...previous,
            [id]: {
                mode: GridRowModes.Edit,
            },
        }));
    };


    // ---------------------------------------------------------
    // DELETE
    // ---------------------------------------------------------

    const handleDeleteClick = (id) => async () => {

        try {

            await deleteStaff(id);

            setStaff((previous) =>
                previous.filter((row) => row.id !== id)
            );

        } catch (error) {

            console.error("Error deleting staff:", error);

            setErrorMessage(
                error.message || "Failed to delete staff"
            );
        }
    };


    // ---------------------------------------------------------
    // CANCEL EDIT
    // ---------------------------------------------------------

    const handleCancelClick = (id) => () => {

        setRowModesModel((previous) => ({
            ...previous,
            [id]: {
                mode: GridRowModes.View,
                ignoreModifications: true,
            },
        }));
    };


    // ---------------------------------------------------------
    // SAVE EDIT
    // ---------------------------------------------------------

    const handleSaveClick = (id, row) => async () => {

        try {

            /*
             * Backend expects:
             *
             * StaffRequest {
             *     staffName
             *     staffAlias
             *     idNumber
             *     phoneNumber
             *     startDate
             *     yearsOfExperience
             *     nationality
             *     physicalAddress
             *     serviceIds
             * }
             */

            const payload = {
                staffName: row.staffName,
                staffAlias: row.staffAlias,
                idNumber: row.idNumber,
                phoneNumber: row.phoneNumber,
                startDate: row.startDate,
                yearsOfExperience: Number(row.yearOfExperience),
                nationality: row.nationality,
                physicalAddress: row.physicalAddress,

                serviceIds: Array.isArray(row.services)
                    ? row.services
                        .map((service) => service.id)
                        .filter(Boolean)
                    : [],
            };

            console.log("Updating staff with:", payload);

            await updateStaff(id, payload);

            setRowModesModel((previous) => ({
                ...previous,
                [id]: {
                    mode: GridRowModes.View,
                },
            }));

            await fetchStaff();

        } catch (error) {

            console.error("Error updating staff:", error);

            setErrorMessage(
                error.message || "Failed to update staff"
            );
        }
    };


    // ---------------------------------------------------------
    // INLINE ROW UPDATE
    // ---------------------------------------------------------

    const processRowUpdate = async (newRow, oldRow) => {

        try {

            const payload = {
                staffName: newRow.staffName,
                staffAlias: newRow.staffAlias,
                idNumber: newRow.idNumber,
                phoneNumber: newRow.phoneNumber,
                startDate: newRow.startDate,
                yearsOfExperience: Number(newRow.yearOfExperience),
                nationality: newRow.nationality,
                physicalAddress: newRow.physicalAddress,

                serviceIds: Array.isArray(newRow.services)
                    ? newRow.services
                        .map((service) => service.id)
                        .filter(Boolean)
                    : [],
            };

            console.log("Row update payload:", payload);

            await updateStaff(newRow.id, payload);

            return newRow;

        } catch (error) {

            console.error("Error updating row:", error);

            return oldRow;
        }
    };


    // ---------------------------------------------------------
    // CREATE STAFF
    // ---------------------------------------------------------

    const handleFormSubmit = async (
        values,
        { resetForm }
    ) => {

        try {

            setErrorMessage("");

            const payload = {
                staffName: values.staffName,
                staffAlias: values.staffAlias,
                idNumber: values.idNumber,
                phoneNumber: values.phoneNumber,
                startDate: values.startDate,
                yearsOfExperience: Number(
                    values.yearOfExperience
                ),
                nationality: values.nationality,
                physicalAddress: values.physicalAddress,

                serviceIds: values.services.map(
                    (service) => service.id
                ),
            };

            console.log("Creating staff with:", payload);

            await createStaff(payload);

            resetForm();

            setOpenForm(false);

            await fetchStaff();

        } catch (error) {

            console.error("Error creating staff:", error);

            setErrorMessage(
                error.message || "Failed to create staff"
            );
        }
    };


    // ---------------------------------------------------------
    // DATA GRID COLUMNS
    // ---------------------------------------------------------

    const columns = [

        {
            field: "staffName",
            headerName: "Staff Name",
            flex: 1,
            minWidth: 150,
            editable: true,
        },

        {
            field: "staffAlias",
            headerName: "AKA",
            flex: 0.8,
            minWidth: 100,
            editable: true,
        },

        {
            field: "idNumber",
            headerName: "ID Number",
            flex: 1,
            minWidth: 120,
            editable: true,
        },

        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 1,
            minWidth: 130,
            editable: true,
        },

        {
            field: "startDate",
            headerName: "Start Date",
            flex: 1,
            minWidth: 120,
            editable: true,
        },

        {
            field: "yearOfExperience",
            headerName: "Years Of Experience",
            flex: 1,
            minWidth: 150,
            editable: true,
        },

        {
            field: "nationality",
            headerName: "Nationality",
            flex: 1,
            minWidth: 120,
            editable: true,
        },

        {
            field: "physicalAddress",
            headerName: "Physical Address",
            flex: 1,
            minWidth: 150,
            editable: true,
        },

        // -----------------------------------------------------
        // SERVICES
        // -----------------------------------------------------

        {
            field: "services",
            headerName: "Expertise",
            flex: 1.5,
            minWidth: 200,

            renderCell: (params) => {

                const staffServices = params.value || [];

                if (!staffServices.length) {
                    return "-";
                }

                return (
                    <Box
                        sx={{
                            display: "flex",
                            gap: "5px",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >

                        {staffServices.map((service, index) => (

                            <Chip
                                key={
                                    service.id ||
                                    `${service.name}-${index}`
                                }
                                label={service.name}
                                size="small"
                                sx={{
                                    backgroundColor:
                                        colors.pinkAccent?.[100] ||
                                        "#f5bdd3",

                                    color:
                                        colors.primary?.[500] ||
                                        "#141b2d",
                                }}
                            />

                        ))}

                    </Box>
                );
            },
        },

        // -----------------------------------------------------
        // ACTIONS
        // -----------------------------------------------------

        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 120,

            getActions: ({ id, row }) => {

                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {

                    return [

                        <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id, row)}
                        />,

                        <GridActionsCellItem
                            key="cancel"
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [

                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,

                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------

    return (

        <Box m="20px">

            <Header
                title="Our Staff"
                subtitle="Managing All Our Staff Effectively."
            />


            {/* -------------------------------------------------
                CREATE STAFF BUTTON
            ------------------------------------------------- */}

            <Box
                display="flex"
                justifyContent="flex-end"
                mb={2}
            >

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setErrorMessage("");
                        setOpenForm(true);
                    }}
                    sx={{
                        backgroundColor: "#b80049",

                        "&:hover": {
                            backgroundColor: "#8f0038",
                        },
                    }}
                >
                    Create Staff
                </Button>

            </Box>


            {/* -------------------------------------------------
                ERROR MESSAGE
            ------------------------------------------------- */}

            {errorMessage && (

                <Typography
                    color="error"
                    mb={2}
                >
                    {errorMessage}
                </Typography>

            )}


            {/* -------------------------------------------------
                CREATE STAFF FORM
            ------------------------------------------------- */}

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
                        services: [],
                    }}

                    validationSchema={yup.object().shape({

                        staffName:
                            yup.string().required("Required"),

                        staffAlias:
                            yup.string().required("Required"),

                        idNumber:
                            yup.string().required("Required"),

                        phoneNumber:
                            yup.string().required("Required"),

                        startDate:
                            yup.string().required("Required"),

                        yearOfExperience:
                            yup.number()
                                .required("Required")
                                .min(0, "Cannot be negative"),

                        nationality:
                            yup.string().required("Required"),

                        physicalAddress:
                            yup.string().required("Required"),

                        services:
                            yup.array()
                                .min(
                                    1,
                                    "At least one service is required"
                                )
                                .required("Required"),
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
                          setFieldValue,
                      }) => (

                        <form onSubmit={handleSubmit}>

                            <Box
                                display="grid"
                                gap="20px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": {
                                        gridColumn:
                                            isNonMobile
                                                ? undefined
                                                : "span 4",
                                    },

                                    backgroundColor:
                                    theme.palette.background.paper,

                                    padding: "20px",

                                    borderRadius: "8px",
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
                                    error={
                                        touched.staffName &&
                                        !!errors.staffName
                                    }
                                    helperText={
                                        touched.staffName &&
                                        errors.staffName
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="A.K.A"
                                    name="staffAlias"
                                    value={values.staffAlias}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.staffAlias &&
                                        !!errors.staffAlias
                                    }
                                    helperText={
                                        touched.staffAlias &&
                                        errors.staffAlias
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="ID Number"
                                    name="idNumber"
                                    value={values.idNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.idNumber &&
                                        !!errors.idNumber
                                    }
                                    helperText={
                                        touched.idNumber &&
                                        errors.idNumber
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.phoneNumber &&
                                        !!errors.phoneNumber
                                    }
                                    helperText={
                                        touched.phoneNumber &&
                                        errors.phoneNumber
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="Start Date"
                                    name="startDate"
                                    value={values.startDate}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={
                                        touched.startDate &&
                                        !!errors.startDate
                                    }
                                    helperText={
                                        touched.startDate &&
                                        errors.startDate
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    label="Years Of Experience"
                                    name="yearOfExperience"
                                    value={
                                        values.yearOfExperience
                                    }
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.yearOfExperience &&
                                        !!errors.yearOfExperience
                                    }
                                    helperText={
                                        touched.yearOfExperience &&
                                        errors.yearOfExperience
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Nationality"
                                    name="nationality"
                                    value={values.nationality}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.nationality &&
                                        !!errors.nationality
                                    }
                                    helperText={
                                        touched.nationality &&
                                        errors.nationality
                                    }
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Physical Address"
                                    name="physicalAddress"
                                    value={
                                        values.physicalAddress
                                    }
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={
                                        touched.physicalAddress &&
                                        !!errors.physicalAddress
                                    }
                                    helperText={
                                        touched.physicalAddress &&
                                        errors.physicalAddress
                                    }
                                />


                                {/* --------------------------------
                                    SERVICES
                                -------------------------------- */}

                                <Autocomplete
                                    multiple
                                    options={services}

                                    getOptionLabel={(option) =>
                                        option.name ||
                                        option.serviceName ||
                                        ""
                                    }

                                    value={values.services}

                                    onChange={(
                                        event,
                                        newValue
                                    ) => {
                                        setFieldValue(
                                            "services",
                                            newValue
                                        );
                                    }}

                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) =>
                                        option.id === value.id
                                    }

                                    renderTags={(
                                        value,
                                        getTagProps
                                    ) =>
                                        value.map(
                                            (
                                                option,
                                                index
                                            ) => (

                                                <Chip
                                                    key={
                                                        option.id
                                                    }
                                                    label={
                                                        option.name ||
                                                        option.serviceName
                                                    }
                                                    {...getTagProps(
                                                        { index }
                                                    )}
                                                />

                                            )
                                        )
                                    }

                                    renderInput={(params) => (

                                        <TextField
                                            {...params}
                                            label="Expertise"
                                            variant="filled"
                                            error={
                                                touched.services &&
                                                !!errors.services
                                            }
                                            helperText={
                                                touched.services &&
                                                errors.services
                                            }
                                        />

                                    )}
                                />

                            </Box>


                            {/* --------------------------------
                                FORM BUTTONS
                            -------------------------------- */}

                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                gap={2}
                                mt={3}
                            >

                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        setOpenForm(false)
                                    }
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        backgroundColor:
                                            "#b80049",

                                        "&:hover": {
                                            backgroundColor:
                                                "#8f0038",
                                        },
                                    }}
                                >
                                    Submit
                                </Button>

                            </Box>

                        </form>

                    )}

                </Formik>

            )}


            {/* -------------------------------------------------
                STAFF TABLE
            ------------------------------------------------- */}

            <Box
                mt={3}
                sx={{
                    height: 500,
                    width: "100%",

                    "& .MuiDataGrid-root": {
                        border: "none",
                    },

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f5bdd3",
                        color: "#141b2d",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                    },
                }}
            >

                <DataGrid
                    rows={staff}
                    columns={columns}

                    editMode="row"

                    rowModesModel={rowModesModel}

                    onRowModesModelChange={
                        setRowModesModel
                    }

                    processRowUpdate={
                        processRowUpdate
                    }

                    onRowEditStop={(
                        params,
                        event
                    ) => {

                        if (event) {
                            event.defaultMuiPrevented =
                                true;
                        }

                    }}

                    disableRowSelectionOnClick

                    pageSizeOptions={[
                        10,
                        25,
                        50,
                        100,
                    ]}
                />

            </Box>

        </Box>
    );
};


export default Staff;