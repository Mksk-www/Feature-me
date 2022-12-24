import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "Pages/home/home";

import SettingsPage from "Pages/settings/settings";
import MusicGame from "Pages/musicGame/musicGame";

const PageRouter: React.FC = () => {
    const location = useLocation()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/play" element={<MusicGame />} />
        </Routes>
    )
}

export default PageRouter;