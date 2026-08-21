import React from "react";
import { Box } from "@mui/material";

import DashboardHeader from "../../components/DashboardHeader";
import StatsCards from "../../components/StatsCards";
import RevenueCard from "../../components/RevenueCard";
import ProjectsTable from "../../components/ProjectsTable";
// import CampaignCard from "../../components/CampaignCard";
// import SalesQuantityCard from "../../components/SalesQuantityCard";
import CustomersCard from "../../components/CustomersCard";
import AnalyticsBanner from "../../components/AnalyticsBanner";
import InventoryCard from "../../components/InventoryCard";
// import GeographyCard from "../../components/GeographyCard";

const Dashboard = () => {
    return (
        <Box m="24px">
            <DashboardHeader />

            <Box
                mt={3}
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="150px"
                gap={3}
            >
                <StatsCards />
                {/*<RevenueCard />*/}
                <ProjectsTable />
                <CustomersCard />

                {/*<CampaignCard />*/}
                {/*<SalesQuantityCard />*/}


                {/*<AnalyticsBanner />*/}
                {/*<InventoryCard />*/}

                {/*<GeographyCard />*/}
            </Box>
        </Box>
    );
};

export default Dashboard;