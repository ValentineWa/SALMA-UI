import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getAllStaff, createStaff } from "../../model/apiService";

const Staff = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [staff, setStaff] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const fetchStaff = async () => {
        try {
            const data = await getAllStaff();
            console.log(data);
            setStaff(data);

        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    useEffect(() => {
        fetchStaff(); // Fetch staff when the component loads
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {

            const formattedValues = {...values,
                serviceNames: values.serviceNames.split(",").map((s) => s.trim()), // Convert to array

            };

            const response = await createStaff(formattedValues);
            console.log("Staff created successfully");
            resetForm();
            setOpenForm(false);
            fetchStaff();
        } catch (error) {
            console.error("Error creating staff:", error);
        }
    };

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
                Create Stylist
            </Button>

            {openForm && (
                <Formik
                    initialValues={{
                        staffName: "",
                        staffAlias: "",
                        idNumber: "",
                        phoneNumber: "",
                        startDate: "",
                        yearsOfExperience: "",
                        nationality: "",
                        physicalAddress: "",
                        serviceNames: "",
                    }}
                    validationSchema={yup.object().shape({
                        staffName: yup.string().required("Required"),
                        staffAlias: yup.string().required("Required"),
                        idNumber: yup.string().required("Required"),
                        phoneNumber: yup
                            .number()
                            .required("Required")
                            .typeError("Phone number must be a number"),
                        startDate: yup.string().required("Required"),
                        yearsOfExperience: yup
                            .number()
                            .typeError("Years of experience must be a number")
                            .required("Required"),
                        nationality: yup.string().required("Required"),
                        physicalAddress: yup.string().required("Required"),
                        serviceNames: yup.string().required("Required"),
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
                                    label="Years Of Experience"
                                    name="yearsOfExperience"
                                    value={values.yearsOfExperience}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.yearsOfExperience && !!errors.yearsOfExperience}
                                    helperText={touched.yearsOfExperience && errors.yearsOfExperience}
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
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="My Services (comma-separated)"
                                    name="serviceNames"
                                    value={values.serviceNames}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.serviceNames && !!errors.serviceNames}
                                    helperText={touched.serviceNames && errors.serviceNames}
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
                <Typography variant="h6">Staff List</Typography>
                <Box>
                    {staff.length > 0 ? (
                        staff.map((staf) => (
                            <Box key={staf.id} mb={2} p={2} border="1px solid #ccc">
                                <Typography>
                                    <strong>Staff Name:</strong> {staf.staffName} {staf.lastName}
                                </Typography>
                                <Typography>
                                    <strong>Staff Alias:</strong> {staf.staffAlias}
                                </Typography>
                                <Typography>
                                    <strong>Id Number:</strong> {staf.idNumber}
                                </Typography>
                                <Typography>
                                    <strong>Phone Number:</strong> {staf.phoneNumber}
                                </Typography>
                                <Typography>
                                    <strong>Start Date:</strong> {staf.startDate}
                                </Typography>
                                <Typography>
                                    <strong>Years Of Experience:</strong> {staf.yearsOfExperience}
                                </Typography>
                                <Typography>
                                    <strong>Nationality:</strong> {staf.nationality}
                                </Typography>
                                <Typography>
                                    <strong>Physical Address:</strong> {staf.physicalAddress}
                                </Typography>
                                <Typography>
                                    <strong>Service Names:</strong> {Array.isArray(staf.serviceNames) ? staf.serviceNames.join(",") : staf.serviceNames}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No Staff found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Staff;