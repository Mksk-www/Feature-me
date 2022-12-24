import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "Pages/home/home";

import SettingsPage from "Pages/settings/settings";

const PageRouter: React.FC = () => {
    const location = useLocation()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/*" element={<SettingsPage />} />
        </Routes>
    )
}

export default PageRouter;