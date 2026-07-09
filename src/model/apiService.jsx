
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8090/api/v1";

if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "development") {
    console.info("[SALMA-UI] Using API base URL:", API_BASE_URL);
}

const fetchAPI = async (url, options) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);
        if (!response.ok) {
            let errorMessage = `Request failed with status ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.statusMessage || errorData.message || errorMessage;
            } catch (_) {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch (_) {}
            }
            throw new Error(errorMessage);
        }

        try {
            return await response.json();
        } catch (_) {
            return null;
        }
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

// API Calls

//Customer
export const getAllCustomers = async () => {
    return fetchAPI("/customers/getAllCustomers", {
        method: "GET",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==", // Your auth header
        },
    });
};
export const createCustomer = async (customerData) => {
    return fetchAPI("/customers/createNew", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(customerData),
    });
};
export const deleteCustomer = async (id, customerData) => {
    return fetchAPI(`/customers/deleteCustomer/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(customerData),
    });
};
export const updateCustomer = async (id, customerData) => {
    return fetchAPI(`/customers/updateCustomer/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(customerData),
    });
};

//Appointments
export const getAllAppointments = async () => {
    return fetchAPI("/booking/getAllBookings", {
        method: "GET",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};
export const createAppointments = async (bookingData) => {
    return fetchAPI("/booking/createNew", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(bookingData),
    });
};
export const triggerAppointmentPayment = async (id) => {
    return fetchAPI(`/booking/triggerPayment/${id}`, {
        method: "POST",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};

export const setAppointmentInProgress = async (id) => {
    return fetchAPI(`/booking/appointments/${id}/inProgress`, {
        method: "POST",
        headers: {

            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};

export const cancelAppointment = async (id) => {
    return fetchAPI(`/booking/appointments/${id}/cancel`, {
        method: "POST",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};

export const markAppointmentNoShow = async (id) => {
    return fetchAPI(`/booking/appointments/${id}/noShow`, {
        method: "POST",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};

export const completeAppointment = async (id, payload) => {
    return fetchAPI(`/booking/appointments/${id}/completed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(payload || {}),
    });
};

export const updateAppointment = async (id, data) => {
    return fetchAPI(`/booking/updateBookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(data || {}),
    });
};
export const deleteAppointment = async (id, serviceData) => {
    return fetchAPI(`/booking/deleteBookings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(serviceData),
    });
};

//Services
export const getAllServices = async () => {
    return fetchAPI("/services/getAllServices", {
        method: "GET",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};
export const createService = async (serviceData) => {
    return fetchAPI("/services/createNew", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(serviceData),
    });
};
export const updateService = async (id, serviceData) => {
    return fetchAPI(`/services/updateService/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(serviceData),
    });
};
export const deleteService = async (id, serviceData) => {
    return fetchAPI(`/services/deleteService/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(serviceData),
    });
};

//Staff
export const getAllStaff = async () => {
    return fetchAPI("/staff/getAllStaff", {
        method: "GET",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};
export const createStaff = async (staffData) => {
    return fetchAPI("/staff/createNew", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(staffData),
    });
};
export const updateStaff = async (id, staffData) => {
    return fetchAPI(`/staff/updateStaff/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(staffData),
    });
};
export const deleteStaff = async (id, staffData) => {
    return fetchAPI(`/staff/deleteStaff/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(staffData),
    });
};
