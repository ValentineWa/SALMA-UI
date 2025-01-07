import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add as AddIcon } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { getAllServices, createServices } from "../../model/apiService";

const Services = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [services, setServices] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const fetchServices = async () => {
        try {
            const data = await getAllServices();
            console.log(data);
            setServices(data);

        } catch (error) {
            console.error("Error fetching Services:", error);
        }
    };

    useEffect(() => {
        fetchServices(); // Fetch services when the component loads
    }, []);

    const handleFormSubmit = async (values, { resetForm }) => {
        try {
            const response = await createServices(values);
            console.log("Services created successfully");
            resetForm();
            setOpenForm(false);
            fetchServices();

        } catch (error) {
            console.error("Error creating services:", error);
        }
    };

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
                        duration: yup.number().required("Required"),
                        price: yup.number().required("Required"),
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
                                    InputLabelProps={{ shrink: true }}
                                    value={values.description}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.description && !!errors.description}
                                    helperText={touched.description && errors.description}
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
                <Typography variant="h6">Services List</Typography>
                <Box>
                    {services.length > 0 ? (
                        services.map((serv) => (
                            <Box key={serv.id} mb={2} p={2} border="1px solid #ccc">
                                <Typography>
                                    <strong>Service Name:</strong> {serv.serviceName}
                                </Typography>
                                <Typography>
                                    <strong>Duration:</strong> {serv.duration}
                                </Typography>
                                <Typography>
                                    <strong>Price:</strong> {serv.price}
                                </Typography>
                                <Typography>
                                    <strong>Description:</strong> {serv.description}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No services found.</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Services;