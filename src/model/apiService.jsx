
// apiService.js
const API_BASE_URL = "http://localhost:8090/api/v1";

// Utility function for handling API requests
const fetchAPI = async (url, options) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.statusMessage || "An error occurred";
            throw new Error(errorMessage);
        }

        return await response.json();
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

//Services
export const getAllServices = async () => {
    return fetchAPI("/services/getAllServices", {
        method: "GET",
        headers: {
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
    });
};
export const createServices = async (bookingData) => {
    return fetchAPI("/services/createNew", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic Y2xpZW50OmNsaWVudC1wYXNzd29yZA==",
        },
        body: JSON.stringify(bookingData),
    });
};

