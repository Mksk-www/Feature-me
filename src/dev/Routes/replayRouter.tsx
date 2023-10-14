import ReplayPage from "Pages/replay/replayPage";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const ReplayRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ReplayPage />} />
            <Route path="/renderer" element={<div />} />
        </Routes>
    )
}

export default ReplayRouter;