import {useState} from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";

import Clients from "./scenes/clients";
import Appointments from "./scenes/appointments";
import Staff from "./scenes/staff";
import Services from "./scenes/services";
// import Reminders from "./scenes/reminders";
// import Finances from "./scenes/finances";
// import Reports from "./scenes/reports";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] =useState(true);

  return (
      <ColorModeContext.Provider value = {colorMode}>
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <div className="app">
                <Sidebar isSidebar={setIsSidebar} />
                <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/form" element={<Form />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/line" element={<Line Chart />} />
                        <Route path="/geography" element={<Geography />} />
                        <Route path="/calendar" element={<Calendar />} />

                        <Route path="/clients" element={<Clients />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/staff" element={<Staff />} />
                        {/*<Route path="/reminders" element={<Reminders />} />*/}
                        {/*<Route path="/finances" element={<Finances />} />*/}
                        {/*<Route path="/reports" element={<Reports />} />*/}
                    </Routes>
                </main>
            </div>
        </ThemeProvider>


      </ColorModeContext.Provider>
      );

}

export default App;