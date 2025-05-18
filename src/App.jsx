import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardProyek from "./pages/DashboardProyek";
import DetailProyek from "./pages/DetailProyek";
import DashboardKontraktor from "./pages/DashboardKontraktor";
import DashboardMaterial from "./pages/DashboardMaterial";
import DashboardLaporan from "./pages/DashboardLaporan";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/proyek" replace />} />
                    <Route path="/proyek" element={<DashboardProyek />} />
                    <Route path="/proyek/:id" element={<DetailProyek />} />
                    <Route path="/kontraktor" element={<DashboardKontraktor />} />
                    <Route path="/material" element={<DashboardMaterial />} />
                    <Route path="/laporan" element={<DashboardLaporan />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;