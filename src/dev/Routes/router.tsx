import React from "react";
import { Routes, Route } from "react-router-dom";

import Title from "Pages/Title/title";

const PageRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Title />} />
        </Routes>
    )
}

export default PageRouter;