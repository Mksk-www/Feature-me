import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import GeneralSettings from "Pages/settings/contents/General";
import AudioSettings from "Pages/settings/contents/Audio";
import GraphicsSettings from "Pages/settings/contents/Graphics";
import GameplaySettings from "Pages/settings/contents/Gameplay";

const SettingsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneralSettings />} />
            <Route path="/graphics" element={<GraphicsSettings />} />
            <Route path="/audio" element={<AudioSettings />} />
            <Route path="/gameplay" element={<GameplaySettings />} />
        </Routes>
    )
}

export default SettingsRouter;