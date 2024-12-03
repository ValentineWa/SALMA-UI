
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
    return (
        <Box m="20px">
            <Header title="Bar Chart" subtitle="Simple Bar Chart" />
            <Box height="75vh">
                <BarChart />
            </Box>
        </Box>
    );
};

export default Bar;
// use this for sales comparisons vs Appointments vs Actual Bookings vs Monthly perfomance vs Staff performance etc