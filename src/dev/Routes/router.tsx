import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "Pages/home/home";

const PageRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default PageRouter;