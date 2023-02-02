import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "Pages/home/home";

import SettingsPage from "Pages/settings/settings";
import MusicGame from "Pages/musicGame/musicGame";
import ResultPage from "Pages/result/result";
import ReplayRouter from "./replayRouter";

const PageRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/play" element={<MusicGame />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/replay/*" element={<ReplayRouter />} />
        </Routes>
    )
}

export default PageRouter;