import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "Pages/home/home";

import SettingsPage from "Pages/settings/settings";
import MusicGame from "Pages/musicGame/musicGame";
import ResultPage from "Pages/result/result";

const PageRouter: React.FC = () => {
    const location = useLocation()
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/play" element={<MusicGame />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    )
}

export default PageRouter;