import React from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SidebarDashboard from "./SidebarDashboard";
import ChartsMaps from "./ChartsMaps";

function App() {
  return (
    <>
      {/* Routing of the components */}
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<SidebarDashboard />} />
          <Route exact path="/charts" element={<ChartsMaps />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
