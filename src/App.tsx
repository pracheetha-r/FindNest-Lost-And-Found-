import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ReportItemPage from "./pages/ReportItemPage";
import BrowsePage from "./pages/BrowsePage";
import MatchPage from "./pages/MatchPage";
import ClaimPage from "./pages/ClaimPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/report" element={<ReportItemPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/match/:id" element={<MatchPage />} />
        <Route path="/claim" element={<ClaimPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
